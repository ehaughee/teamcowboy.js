import { create } from "../request/params.js";
import { TCResponse } from "../request/types.js";
import { Client, TCEvent } from "../types.js";

export type EventMethods = {
  readonly get: Get;
  readonly saveRSVP: SaveRSVP;
};

type SaveRSVPResponse = TCResponse<{
  readonly success: boolean;
  readonly errorCode?: "rsvpOverTotal" | "rsvpNotAllowed" | "userNotOnTeam" | "commentsOverMaxLength" | "generalError";
}>;

type SaveRSVPOptions = {
  readonly teamId: number;
  readonly eventId: number;
  readonly status: "yes" | "maybe" | "available" | "no" | "noresponse";
  readonly addlMale?: number | null;
  readonly addlFemale?: number | null;
  readonly comments?: string | null;
  readonly rsvpAsUserId?: number | null;
};

type SaveRSVP = (options: SaveRSVPOptions) => Promise<SaveRSVPResponse>;

type SaveRSVPRequestParams = SaveRSVPOptions & {
  readonly method: "Event_SaveRSVP";
};

type GetResponse = TCResponse<TCEvent>;

type GetOptions = {
  readonly teamId: number;
  readonly eventId: number;
  readonly includeRSVPInfo?: boolean | null;
};

type Get = (options: GetOptions) => Promise<GetResponse>;

type GetEventRequestParams = GetOptions & {
  readonly method: "Event_Get";
};

const saveRSVP = async (
  client: Client,
  { teamId, eventId, status, addlMale, addlFemale, comments, rsvpAsUserId }: SaveRSVPOptions,
) => {
  const params = create<SaveRSVPRequestParams>({
    client,
    httpMethod: "POST",
    params: {
      method: "Event_SaveRSVP",
      teamId,
      eventId,
      status,
      addlMale: addlMale ?? null,
      addlFemale: addlFemale ?? null,
      comments: comments ?? null,
      rsvpAsUserId: rsvpAsUserId ?? null,
    },
  });

  const { data } = await client.axiosInstance.post<SaveRSVPResponse>("/", params);

  return data;
};

const get = async (
  client: Client,
  { eventId, teamId, includeRSVPInfo }: GetOptions,
) => {
  const params = create<GetEventRequestParams>({
    client,
    httpMethod: "GET",
    params: {
      eventId,
      method: "Event_Get",
      teamId,
      includeRSVPInfo: includeRSVPInfo ?? null,
    },
  });

  const { data } = await client.axiosInstance.get<GetResponse>("/", { params });

  return data;
};

export const eventMethods = (client: Client): EventMethods => {
  return {
    get: (options) => get(client, options),
    saveRSVP: (options) => saveRSVP(client, options),
  };
};
