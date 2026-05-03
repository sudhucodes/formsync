import { FormSync } from "formsync";

export const formsync = new FormSync({
    apiKey: process.env.FORMSYNC_API_KEY!
})