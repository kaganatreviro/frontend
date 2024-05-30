/* eslint-disable */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { fetchEstablishmentsList, setCurrentEstablishment } from "../../../store/actions/partner/establishemntsSlice";
import { fetchEstablishments } from "../../../components/api/api";
import { useNavigate } from "react-router-dom";
import { fetchPartner } from "../../../store/actions/admin/partner/partnerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../../helpers/hooks/hook";

const EstablishmentSelection: React.FC = () => {
  const dispatch = useAppDispatch();
  const establishments = useSelector((state: RootState) => state.establishments.establishments) || [];
  const navigate = useNavigate();
  const partners = useSelector((state: RootState) => state.partner.partners);
  

  useEffect(() => {
    dispatch(fetchPartner());
    dispatch(fetchEstablishmentsList());
    fetchEstablishments()
      .then((data) => console.log("Establishments fetched:", data))
      .catch((error) => console.error("Error fetching establishments:", error));
  }, [dispatch]);

  const handleSelectChange = (value: number) => {
    const selectedEstablishment = establishments.find((est) => est.id === value);
    if (selectedEstablishment) {
      dispatch(setCurrentEstablishment(selectedEstablishment));
      localStorage.setItem("currentEstablishmentId", value.toString());
      localStorage.setItem("currentEstablishmentName", selectedEstablishment.name.toString());
      navigate("/feedback/establishment");
    }
  };
  const partnersWithEstablishments = partners.filter((partner) =>
    establishments.some((establishment) => establishment.owner === partner.id)
  );

  return (
    <div className="bg-[#f4f4f4] flex-1 p-12 select-none">
      <div className="font-medium text-4xl mb-8">Choose Establishment:</div>
      {partnersWithEstablishments.map((partner) => (
          <div key={partner.id} className="py-4">
            <div className="flex mb-6">
              <h2 className="text-3xl ">{partner.name}</h2>
            </div>
            <div className="flex flex-wrap gap-x-16 gap-y-10">
              {establishments
                .filter((establishment) => establishment.owner === partner.id)
                .map((establishment) => (
                  <div key={establishment.id}
                  onClick={()=>handleSelectChange(establishment.id)}
                  className="bg-white rounded px-4 py-4 w-[250px] cursor-pointer transition-shadow duration-300 hover:shadow-md ">

                    <div className="flex gap-5 justify-between">
                      {establishment.logo ? (
                        <img
                          src={establishment.logo}
                          className="w-20 h-20 rounded-md"
                          alt="Establishment Logo"
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/5900/5900188.png"
                          className="w-20 h-20 rounded-md"
                          alt="Default Logo"
                        />
                      )}
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-xl text-end">{establishment.name}</div>
                        <div className="flex items-center text-[#D56A00]">
                        <FontAwesomeIcon
                          icon={faComment}
                          className="w-4 h-4 mr-2"
                        />
                        <div>{establishment.feedback_count}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EstablishmentSelection;