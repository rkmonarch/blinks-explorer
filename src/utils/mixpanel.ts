import Mixpanel from "mixpanel";

var mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN as string);

export default mixpanel;