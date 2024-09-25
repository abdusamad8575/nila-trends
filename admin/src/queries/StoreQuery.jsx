import { useMutation, useQuery, useQueryClient } from "react-query";
import {
    getBlogs,
    addBlogs,
    getBlogsById,
    editBlogs,
    deleteBlogs,
    addSection,
    editSection,
    deleteSection,
    getSection,
    getSectionById,
    addBanners,
    editBanners,
    deleteBanners,
    getBannersById,
    getBanners,
    getUsers,
    editUsers
} from "./storeUrls";

const useGetBlogs = (data) => {
    return useQuery(["get_blogs", data], () => getBlogs(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBlogsById = (data) => {
    return useQuery(["get_blogs", data], () => getBlogsById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBlogs = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBlogs(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_blogs");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useGetSection = (data) => {
    return useQuery(["get_section", data], () => getSection(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetSectionById = (data) => {
    return useQuery(["get_section", data], () => getSectionById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddSection = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addSection(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_section");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditSection = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editSection(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_section");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteSection = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteSection(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_section");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useGetBanners = (data) => {
    return useQuery(["get_banners", data], () => getBanners(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useGetBannersById = (data) => {
    return useQuery(["get_banners", data], () => getBannersById(data), {
        staleTime: 3000,
        keepPreviousData: true,
        // refetchOnWindowFocus: false,
    });
};

const useAddBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => addBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useEditBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => editBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useDeleteBanners = () => {
    const queryClient = useQueryClient();

    return useMutation((data) => deleteBanners(data), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_banners");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
};

const useGetUser = (params) => {
    return useQuery(["get_user", params], () => getUsers(params), {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });
  };
  const useUpdateUserStatus = () => {
    
    const queryClient = useQueryClient();
  
    return useMutation(({ userId, newStatus }) => editUsers({ userId, newStatus }), {
        onSuccess: (data) => {
            queryClient.invalidateQueries("get_user");
            return data;
        },
        onError: (data) => {
            return data;
        },
    });
  };
export {
    useGetBlogs,
    useGetBlogsById,
    useAddBlogs,
    useEditBlogs,
    useDeleteBlogs,
    useGetSection,
    useGetSectionById,
    useAddSection,
    useEditSection,
    useDeleteSection,
    useGetBanners,
    useGetBannersById,
    useAddBanners,
    useEditBanners,
    useDeleteBanners,
    useGetUser, 
    useUpdateUserStatus
};
