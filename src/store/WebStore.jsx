import { create } from "zustand";
import { persist } from "zustand/middleware";
import {getAllCategories} from "../api/CategoryService.js";
import axios from "axios";
import {getAllCompanies, getLocationFilter} from "../api/PublicService.js";

export const useWebStore = create(
    persist(
        (set) => ({
            categories: null,
            cities:null,
            companies:null,

            getDataWebsite: async () => {
                const [ categoriesRes,locationRes,companiesRes] = await axios.all([ getAllCategories(),getLocationFilter(),getAllCompanies()]);
                console.log(categoriesRes)
                set({
                    categories: categoriesRes.data || null,
                    cities:locationRes.data||null,
                    companies:companiesRes.data||null,
                });
            }
        }),
        {
            name: "web-store",

        }
    )
);
