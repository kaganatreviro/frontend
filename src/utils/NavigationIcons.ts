import {
  IconDefinition,
  faUserGroup,
  faComments,
  faHandshakeSimple,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

interface NavigationIcon {
  icon: IconDefinition;
}

const NavigationIcons: { [key: string]: NavigationIcon } = {
  Users: { icon: faUserGroup },
  Partners: { icon: faHandshakeSimple },
  Categories: { icon: faLayerGroup },
  Feedback: { icon: faComments },
};

export default NavigationIcons;
