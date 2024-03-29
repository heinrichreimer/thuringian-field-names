import { Fragment, FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import { FormattedGeoCoordinate } from ".";

/**
 * Component for locale-aware displaying a latitude coordinate.
 */
export const FormattedGeoLatitude: FunctionComponent<{
  latitude: number;
}> = ({ latitude }) => {
  const direction =
    latitude >= 0 ? (
      <FormattedMessage id="fieldName.geo.direction.north" />
    ) : (
      <FormattedMessage id="fieldName.geo.direction.south" />
    );
  return (
    <Fragment>
      {direction} <FormattedGeoCoordinate coordinate={latitude} />
    </Fragment>
  );
};
