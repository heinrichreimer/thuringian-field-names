import {
  FieldName,
  FieldNameSnippet,
  FieldNameType,
  GeoArea,
  GeoCoordinates,
  License,
} from "../model";
import {
  CbuUnitType,
  MyCoreChild,
  MyCoreChildAttributes,
  MyCoreChildren,
  MyCoreCoordinates,
  MyCoreCoordinatesAttributes,
  MyCoreCoordinatesDef,
  MyCoreCoordinatesType,
  MyCoreLicense,
  MyCoreLicenseAttributes,
  MyCoreLicenseDef,
  MyCoreLicenseType,
  MyCoreMetadata,
  MyCoreObject,
  MyCorePlace,
  MyCorePlaceDef,
  MyCoreService,
  MyCoreServiceDate,
  MyCoreServiceDates,
  MyCoreServiceDateType,
  MyCoreServiceFlag,
  MyCoreServiceFlags,
  MyCoreServiceFlagType,
  MyCoreStructure,
  MyCoreTitle,
  MyCoreTitleDef,
  MyCoreTypeOfUnit,
  MyCoreTypeOfUnitDef,
  SearchDocument,
  SearchResponse,
  WrappedMyCoreObject,
  WrappedSearchResponse,
} from "./model";

export function parseWrappedSearchResponse(
  raw: WrappedSearchResponse
): Array<FieldNameSnippet> {
  return parseSearchResponse(raw.response);
}

function parseSearchResponse(raw: SearchResponse): Array<FieldNameSnippet> {
  return raw.docs.map(parseSearchDocument);
}

function parseCbuUnitType(raw: CbuUnitType): FieldNameType {
  switch (raw) {
    case CbuUnitType.Map:
      return FieldNameType.Map;
    case CbuUnitType.Marking:
      return FieldNameType.Marking;
  }
}

function parseSearchDocument(raw: SearchDocument): FieldNameSnippet {
  return {
    id: raw.id,
    gndNumber: raw["place.type.gnd"][0],
    title: raw.title[0],
    type: parseCbuUnitType(raw["cbuUnitTypes.actual"]),
    creation: {
      date: raw.created,
      author: raw.createdby[0],
    },
    lastModification: {
      date: raw.modified,
      author: raw.modifiedby,
    },
  };
}

export function parseWrappedMyCoreObject(raw: WrappedMyCoreObject): FieldName {
  return parseMyCoreObject(raw.mycoreobject);
}

function parseMyCoreObject(raw: MyCoreObject): FieldName {
  return {
    id: raw.attributes.ID,
    ...parseMyCoreMetadata(raw.metadata[0]),
    ...parseMyCoreService(raw.service[0]),
    childrenIds: parseMyCoreStructure(raw.structure[0]),
  };
}

function parseMyCoreStructure(raw: MyCoreStructure): Array<string> {
  return raw.children ? parseMyCoreChildren(raw.children[0]) : [];
}

function parseMyCoreChildren(raw: MyCoreChildren): Array<string> {
  return raw.child.map(parseMyCoreChild);
}

function parseMyCoreChild(raw: MyCoreChild): string {
  return parseMyCoreChildAttributes(raw.attributes);
}

function parseMyCoreChildAttributes(raw: MyCoreChildAttributes): string {
  return raw["xlink:href"];
}

function parseMyCoreService(
  raw: MyCoreService
): Pick<FieldName, "creation" | "lastModification"> {
  const { creationDate, lastModificationDate } = parseMyCoreServiceDates(
    raw.servdates[0]
  );
  const { creationAuthor, lastModificationAuthor } = parseMyCoreServiceFlags(
    raw.servflags[0]
  );
  return {
    creation: {
      date: creationDate,
      author: creationAuthor,
    },
    lastModification: {
      date: lastModificationDate,
      author: lastModificationAuthor,
    },
  };
}

function parseMyCoreServiceDates(
  raw: MyCoreServiceDates
): {
  creationDate: Date;
  lastModificationDate: Date;
} {
  const dates = raw.servdate.map(parseMyCoreServiceDate);
  const creationDate = dates.filter(
    (date) => date.type === MyCoreServiceDateType.Creation
  )[0].date;
  const lastModificationDate = dates.filter(
    (date) => date.type === MyCoreServiceDateType.LastModification
  )[0].date;
  return {
    creationDate,
    lastModificationDate,
  };
}

function parseMyCoreServiceDate(
  raw: MyCoreServiceDate
): {
  type: MyCoreServiceDateType;
  date: Date;
} {
  return {
    type: raw.attributes.type,
    date: new Date(raw.content),
  };
}

function parseMyCoreServiceFlags(
  raw: MyCoreServiceFlags
): {
  creationAuthor: string;
  lastModificationAuthor: string;
} {
  const authors = raw.servflag.map(parseMyCoreServiceFlag);
  const creationAuthor = authors.filter(
    (author) => author.type === MyCoreServiceFlagType.Creation
  )[0].author;
  const lastModificationAuthor = authors.filter(
    (author) => author.type === MyCoreServiceFlagType.LastModification
  )[0].author;
  return {
    creationAuthor,
    lastModificationAuthor,
  };
}

function parseMyCoreServiceFlag(
  raw: MyCoreServiceFlag
): {
  type: MyCoreServiceFlagType;
  author: string;
} {
  return {
    type: raw.attributes.type,
    author: raw.content,
  };
}

function parseMyCoreMetadata(
  raw: MyCoreMetadata
): Pick<FieldName, "type" | "title" | "gndNumber" | "area" | "license"> {
  const licenseDefs = raw["def.license"];
  const coordinateDefs = raw["def.coordinates"];
  if (!coordinateDefs) {
    // FIXME Some field names doesn't contain coordinates.
    // Example: HisBest_cbu_00080392
    throw Error(`No coordinates for ${JSON.stringify(raw)}.`);
  }
  return {
    type: parseMyCoreTypeOfUnitDef(raw["def.typeOfUnit"][0]),
    title: parseMyCoreTitleDef(raw["def.title"][0]),
    gndNumber: parseMyCorePlaceDef(raw["def.place"][0]),
    area: parseMyCoreCoordinatesDef(coordinateDefs[0]),
    license: licenseDefs
      ? parseMyCoreLicenseDef(licenseDefs[0])
      : License.Unknown,
  };
}

function parseMyCoreTypeOfUnitDef(raw: MyCoreTypeOfUnitDef): FieldNameType {
  return parseMyCoreTypeOfUnit(raw.typeOfUnit[0]);
}

function parseMyCoreTypeOfUnit(raw: MyCoreTypeOfUnit): FieldNameType {
  return parseCbuUnitType(raw.attributes.categid);
}

function parseMyCoreTitleDef(raw: MyCoreTitleDef): string {
  return parseMyCoreTitle(raw.title[0]);
}

function parseMyCoreTitle(raw: MyCoreTitle): string {
  return raw.content;
}

function parseMyCorePlaceDef(raw: MyCorePlaceDef): string {
  return parseMyCorePlace(raw.place[0]);
}

function parseMyCorePlace(raw: MyCorePlace): string {
  return raw.content;
}

function parseMyCoreCoordinatesDef(raw: MyCoreCoordinatesDef): GeoArea {
  const coordinates = raw.coordinates.map(parseMyCoreCoordinates);
  const [latitude1, latitude2] = coordinates
    .filter((coordinate) => coordinate.type === "latitude")
    .map((coordinate) => coordinate.coordinate);
  const [longitude1, longitude2] = coordinates
    .filter((coordinate) => coordinate.type === "longitude")
    .map((coordinate) => coordinate.coordinate);
  const from: GeoCoordinates = {
    latitude: latitude1,
    longitude: longitude1,
  };
  const to: GeoCoordinates = {
    latitude: latitude2,
    longitude: longitude2,
  };
  return {
    from,
    to,
  };
}

function parseMyCoreCoordinates(
  raw: MyCoreCoordinates
): { type: keyof GeoCoordinates; coordinate: number } {
  const type = parseMyCoreCoordinatesAttributes(raw.attributes);
  const [rawDirection, rawDegrees, rawMinutes, rawSeconds] = raw.content.split(
    " "
  );
  const direction = parseMyCoreCoordinatesDirection(rawDirection, type);
  const degrees = parseInt(rawDegrees);
  const minutes = rawMinutes ? parseInt(rawMinutes) : 0;
  const seconds = rawSeconds ? parseInt(rawSeconds) : 0;
  const coordinate =
    direction * (degrees + (1 / 60) * (minutes + (1 / 60) * seconds));
  if (isNaN(coordinate)) {
    throw Error(`Unable to parse coordinate ${coordinate} of type ${type}.`);
  }
  return { type, coordinate };
}

function parseMyCoreCoordinatesDirection(
  direction: string,
  type: keyof GeoCoordinates
): -1 | 1 {
  if (direction === "N" && type === "latitude") {
    return 1;
  } else if (direction === "S" && type === "latitude") {
    return -1;
  } else if (direction === "E" && type === "longitude") {
    return 1;
  } else if (direction === "W" && type === "longitude") {
    return -1;
  } else {
    throw Error(
      `Unable to parse coordinate of type ${type} with direction ${direction}.`
    );
  }
}

function parseMyCoreCoordinatesAttributes(
  raw: MyCoreCoordinatesAttributes
): keyof GeoCoordinates {
  return parseMyCoreCoordinatesType(raw.type);
}

function parseMyCoreCoordinatesType(
  raw: MyCoreCoordinatesType
): keyof GeoCoordinates {
  if (
    raw === MyCoreCoordinatesType.North ||
    raw === MyCoreCoordinatesType.South
  ) {
    return "latitude";
  } else if (
    raw === MyCoreCoordinatesType.East ||
    raw === MyCoreCoordinatesType.West
  ) {
    return "longitude";
  } else {
    throw Error(`Unknown coordinate type for ${raw}.`);
  }
}

function parseMyCoreLicenseDef(raw: MyCoreLicenseDef): License {
  return parseMyCoreLicense(raw.license[0]);
}

function parseMyCoreLicense(raw: MyCoreLicense): License {
  return parseMyCoreLicenseAttributes(raw.attributes);
}

function parseMyCoreLicenseAttributes(raw: MyCoreLicenseAttributes): License {
  return parseMyCoreLicenseType(raw.categid);
}

function parseMyCoreLicenseType(raw: MyCoreLicenseType): License {
  if (raw === MyCoreLicenseType.CcByNcSa40) {
    return License.CcByNcSa40;
  } else {
    return License.Unknown;
  }
}
