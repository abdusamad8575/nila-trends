import { Alert, Box, Button, Grid, Typography,TextField,Autocomplete } from "@mui/material";
import React, { useState } from 'react'
import PageLayout from 'layouts/PageLayout';
import { useAddCoupon,useGetSimilarProducts,useGetCategory } from "queries/ProductQuery";
import toast from "react-hot-toast";
import Input from "components/Input";
import { useNavigate  } from 'react-router-dom';

const AddCoupon = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([])
  const [product, setProduct] = useState([])

  const [data, setData] = useState({})
  const fileInputRef = React.useRef(null);
  
  const { data:catRespo } = useGetCategory({ pageNo: 1, pageCount: 100 });
  const { data: respo } = useGetSimilarProducts({ pageNo: 1, pageCount: 100 });

  

  const handleChange = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { mutateAsync: addCategory, isLoading } = useAddCoupon()

  const handleSubmit = () => {
    try {

      const requiredFields = ['name','code','discount', 'validity', 'minValue', 'maxValue'];
      for (const field of requiredFields) {
        if (!data[field]) {
          return toast.error(`${field} is required`);
        }
      }
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key) && key !== "image") {
          formData.append(key, data[key]);
        }
      }
      category.length && category.forEach((category) =>formData.append('categorys', category?._id));
      product.length && product.forEach((product) => formData.append('products', product._id));
      addCategory(formData)
        .then((res) => {
          toast.success(res?.message ?? "Coupon added");
          navigate('/coupons')
        })
        .catch((err) => {
          toast.error(err?.message ?? "Something went wrong");
        });

    } catch (error) {
      console.error(error)
    }
  }
  return (
    <PageLayout
      title={'Add Coupon'}
    >
      <Box sx={{ flexGrow: 1 }} display={'flex'} justifyContent={'center'}>
        <Grid container spacing={2} maxWidth={600} py={5}>
          <Grid item xs={12} sm={6}>
            <Input
              required
              placeholder="Coupon Name"
              id="name"
              name="name"
              label="Coupon Name"
              value={data?.name || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              required
              placeholder="Coupon Code"
              id="code"
              name="code"
              label="Coupon code"
              value={data?.code || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="code"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
            type='number'
              required
              placeholder="Discount"
              id="discount"
              name="discount"
              label="discount"
              value={data?.discount || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
            type='date'
              required
              placeholder="validity"
              id="validity"
              name="validity"
              label="validity"
              value={data?.validity || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="name"
              variant="outlined"
            />
          </Grid>

         

          <Grid item xs={12} sm={6}>
            <Input
              type='number'
              required
              placeholder="Minimum Purchase Value"
              id="minValue"
              name="minValue"
              label="Minimum Value"
              value={data?.minValue || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="minValue"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Input
              type='number'
              required
              placeholder="Maximum Discount"
              id="maxValue"
              name="maxValue"
              label="Maximum Value"
              value={data?.maxValue || ''}
              onChange={handleChange}
              fullWidth
              autoComplete="maxValue"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="category-select"
              multiple
              options={catRespo?.data || []}
              value={category}
              onChange={(event, newValue) => {
                setCategory(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image}`}
                  />
                  <Typography color="inherit" variant="caption">
                    {option?.name} <br />
                    {option?.desc}
                  </Typography>
                  <Typography sx={{ ml: 'auto' }} color={option?.isAvailable ? 'success' : 'error'} variant="caption">
                    {option?.isAvailable ? 'available' : 'NA'}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose categorys"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              id="Product-select"
              multiple
              options={respo?.data || []}
              value={product}
              onChange={(event, newValue) => {
                setProduct(newValue);
              }}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`${process.env.REACT_APP_API_URL}/uploads/${option?.image[0]}`}
                  />
                  <Typography color="inherit" variant="caption">
                    {option?.name} <br />
                    {option?.brand}
                  </Typography>
                  <Typography sx={{ ml: 'auto' }} color={option?.isAvailable ? 'success' : 'error'} variant="caption">
                    {option?.isAvailable ? 'available' : 'NA'}
                  </Typography>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Choose products"
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </Grid>

      
          <Grid item xs={12}>
            <Button onClick={handleSubmit}>Add Coupon</Button>
          </Grid>
          
        </Grid>
      </Box>

    </PageLayout>
  )
}

export default AddCoupon