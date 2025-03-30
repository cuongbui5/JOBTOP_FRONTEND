import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllTags } from "../api/TagService.js";
import { getAllIndustries } from "../api/IndustryService.js";
import {getAllCategories} from "../api/CategoryService.js";
import axios from "axios";
import {getCompanyFilter, getLocationFilter} from "../api/PublicService.js";

export const useWebStore = create(
    persist(
        (set, get) => ({
            tags: null,
            industries: null,
            categories: null,
            cities:null,
            recruiterProfiles:null,

            getDataWebsite: async () => {
                const [tagsRes, industriesRes, categoriesRes,locationRes,recruiterProfilesRes] = await axios.all([getAllTags(), getAllIndustries(), getAllCategories(),getLocationFilter(),getCompanyFilter()]);
                set({
                    tags: tagsRes.data || null,
                    industries: industriesRes.data || null,
                    categories: categoriesRes.data || null,
                    cities:locationRes.data||null,
                    recruiterProfiles:recruiterProfilesRes.data||null,
                });
            }
        }),
        {
            name: "web-store",

        }
    )
);
