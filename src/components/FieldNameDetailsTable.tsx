import { Fragment, FunctionComponent } from "react";
import { Table } from "react-bootstrap";
import { FormattedDate } from "react-intl";
import { FieldName } from "../model";
import {
  FormattedFieldNameType,
  GndLink,
  FormattedLicense,
  FormattedGeoCoordinates,
} from ".";

export const FieldNameDetailsTable: FunctionComponent<{
  fieldName: FieldName;
}> = ({ fieldName }) => {
  return (
    <Fragment>
      <Table>
        <tbody>
          <tr>
            <th>Type</th>
            <td>
              <FormattedFieldNameType type={fieldName.type} />
            </td>
          </tr>
          <tr>
            <th>GND number</th>
            <td>
              <GndLink gndNumber={fieldName.gndNumber} />
            </td>
          </tr>
          <tr>
            <th>Location</th>
            <td>
              From <FormattedGeoCoordinates coordinates={fieldName.area.from} />{" "}
              to <FormattedGeoCoordinates coordinates={fieldName.area.to} />
            </td>
          </tr>
          <tr>
            <th>Last updated</th>
            <td>
              <FormattedDate
                value={fieldName.lastModification.date}
                dateStyle="long"
                timeStyle="short"
              />{" "}
              by {fieldName.lastModification.author}
            </td>
          </tr>
          <tr>
            <th>Created</th>
            <td>
              <FormattedDate
                value={fieldName.creation.date}
                dateStyle="long"
                timeStyle="short"
              />{" "}
              by {fieldName.creation.author}
            </td>
          </tr>
          <tr>
            <th>ID</th>
            <td>{fieldName.id}</td>
          </tr>
          <tr>
            <th>License</th>
            <td>
              <FormattedLicense license={fieldName.license} />
            </td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
};