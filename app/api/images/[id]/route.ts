import {fetchFile} from "@/db/googledrive";

export async function GET(request: Request, context: { params: any })  {
    const response = await fetchFile(context.params.id)
    return new Response(response.body, {
        headers: {
            "Content-Disposition": "inline"
        }
    })
}