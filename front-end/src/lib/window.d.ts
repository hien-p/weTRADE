import { Window as OwalletWindow  } from "@owallet/types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends OwalletWindow {}
}
