import {
  IconDefinition,
  faUserGroup,
  faComments,
  faHandshakeSimple,
  faLayerGroup,
  faQrcode,
  faRectangleList,
  faMugSaucer,
  faUser,
  faStore,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";

interface NavigationIcon {
  icon: IconDefinition;
}

const NavigationIcons: { [key: string]: NavigationIcon } = {
  Users: { icon: faUserGroup },
  Dashboard: { icon: faChartBar },
  Partners: { icon: faHandshakeSimple },
  Categories: { icon: faLayerGroup },
  Feedback: { icon: faComments },
  Profile: { icon: faUser },
  Menu: { icon: faMugSaucer },
  Orders: { icon: faRectangleList },
  QR: { icon: faQrcode },
  Establishments: { icon: faStore },
};

export default NavigationIcons;
