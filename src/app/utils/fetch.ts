import { error } from "console";
import { cookies } from "next/headers";
import qs from "qs";
 
interface FetchResponse<T> {
    data: T | null;
    status?: number;
    error?: {};
}
 
export const fetchApi = async <T>(
    path: string,
    options: RequestInit & {} ={
        method: "GET"
    },
    populate?: any,
    filters?: any
): Promise<FetchResponse<T>> => {
    let headers ={};
    const cookie = await cookies();
    const accessToken = cookie.get("access_token")?.value || "";
    console.log(accessToken)
    if (accessToken !== "") {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        };
    } else {
        headers = {
            "Content-Type": "application/json"
            };
    }
   
    // let url = `${process.env.API_URL}${path}`
    let url: any;
    if (populate) {
        let queryParams: any = {};
        queryParams.populate = populate;
        if (filters) {
          queryParams.filters = filters;
        }
        const newUrl = new URL(path, process.env.API_URL);
        //newUrl.search = qs.stringify({
        //  populate: queryParams
        //});
        newUrl.search = qs.stringify(queryParams);
        url = newUrl;
      } else {
        url = `${process.env.API_URL}${path}`;
      }
    try {
        const response = await fetch(url, { ...options, headers});
        if (!response.ok) {
            //throw new Error("Failed to fetch team members");
            console.log(response)
        }
 
        const result = await response.json();
        return {
            data: result,
            status: response.status,
        }
    } catch (error: unknown) {
        console.error(error);
        return {data: null, status: 500, error: "error"}
    }
}