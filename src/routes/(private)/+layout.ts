import { goto } from "$app/navigation";
import type { LayoutLoad } from "../$types";

export const load: LayoutLoad = async ({ fetch }) => {
  const token = localStorage.getItem("itmpaToken");
  if (!token) {
    goto("/login");
  } 
};