import request from "utils/request";

const addBlogs = async (data) => request(`/blogs`, 'POST', data)
const editBlogs = async (data) => request(`/blogs`, 'PATCH', data)
const deleteBlogs = async (data) => request(`/blogs/${data?._id}`, 'DELETE', data)
const getBlogs = async (data) => request(`/blogs?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBlogsById = async (data) => request(`/blogs/${data?.id}`, 'GET', data)
const addSection = async (data) => request(`/section`, 'POST', data)
const editSection = async (data) => request(`/section`, 'PATCH', data)
const deleteSection = async (data) => request(`/section/${data?._id}`, 'DELETE', data)
const getSection = async (data) => request(`/section?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getSectionById = async (data) => request(`/section/${data?.id}`, 'GET', data)
const addBanners = async (data) => request(`/banners`, 'POST', data)
const editBanners = async (data) => request(`/banners`, 'PATCH', data)
const deleteBanners = async (data) => request(`/banners/${data?._id}`, 'DELETE', data)
const getBanners = async (data) => request(`/banners?page=${data?.pageNo}&perpageitems=${data?.pageCount}`, 'GET', data)
const getBannersById = async (data) => request(`/banners/${data?.id}`, 'GET', data)

const editUsers = async ({ userId, newStatus }) => request('/user/update-status', 'PUT', {userId, newStatus})
    
const getUsers = async ({ page, perPage, sortBy, order, search }) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
    sortBy,
    order,
    search,
  }).toString();

  const response = await request(`/user/getAllUsers?${queryParams}`, 'GET');
  return response;
};

export {  
    addBlogs,
    editBlogs,
    deleteBlogs,
    getBlogs,
    getBlogsById,
    addSection,
    editSection,
    deleteSection,
    getSection,
    getSectionById,
    addBanners,
    editBanners,
    deleteBanners,
    getBanners,
    getBannersById,
    getUsers,
    editUsers
  };
