import {
  IconDefinition,
  faUserGroup,
  faComments,
  faHandshakeSimple,
  faLayerGroup,
  faQrcode,
  faRectangleList,
  faUtensils,
  faUser,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

interface NavigationIcon {
  icon: IconDefinition;
}

const NavigationIcons: { [key: string]: NavigationIcon } = {
  Users: { icon: faUserGroup },
  Partners: { icon: faHandshakeSimple },
  Categories: { icon: faLayerGroup },
  Feedback: { icon: faComments },
  Profile: { icon: faUser },
  Menu: { icon: faUtensils },
  Orders: { icon: faRectangleList },
  QR: { icon: faQrcode },
  Establishments: { icon: faStore },
};

export default NavigationIcons;
