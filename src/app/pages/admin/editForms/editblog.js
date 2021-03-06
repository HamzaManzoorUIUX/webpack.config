import React,{useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {Notice,Card, CardBody, CardHeader} from '../../../../_metronic/_partials/controls';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { repository} from '../../../../boxking/utils/repository';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

 const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string()
    .required('Required'),  
  description: Yup.string()
  .required('Required'),
  shortdescription: Yup.string()
  .required('Required'),

   /*
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
    */
});
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));



export default function TextFields(props) {

  const { record } = props.location.state;
  const  [open,setOpen]=useState(false);
  const  [loader,setloader]=useState(false);

  const  [message,setMessage]=useState("Opps Something wen't wrong");
  const  [categories,setCategories]=useState([]);
  const [image, setImage] = useState(record.image);

  const classes = useStyles();
  const postPType=async (datapost)=>{
    setloader(true);
    const {data,status}= await repository.updateblog(datapost).then(x=>x).then(x=>x)
     try{
      if(status!=200)
      {
        setOpen(true)
        setMessage("Opps Something wen't wrong")
       }
      else
      {
        setOpen(true)
        setMessage("Success! Blog updated sucessfully")
      }

      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setloader(false);

      if(status==200)
      {
        return  true;

      }
     }
     catch
     {
      setOpen(true)
      setMessage("Opps Something wen't wrong")
      setTimeout(() => {
        setOpen(false)
      }, 3000);
      setloader(false);
     }
      return false;
  }
  const getCat=async ()=>{

    const {data,status}= await repository.getCategories().then(response => response).then(x=>x);
    if(status!=200)
    {
      setCategories([]);
     }
    else
    {
      setCategories(data);
    }

  }


  useEffect(()=>{
  },[])
  return (
    <>
    <div className="ldm-div">
          {loader?<LinearProgress  />:<></>}
</div>
      <Notice icon="flaticon-warning font-primary">
        <span>Text fields let users enter and edit text.</span>{" "}
        <span>
          For more info please check the components's official{" "}
          <a
            target="_blank"
            className="font-weight-bold"
            rel="noopener noreferrer"
            href="https://material-ui.com/components/text-fields/"
          >
            demos & documentation
          </a>
        </span>
      </Notice>
      <div className="row">
      <div className="col-md-6">
      <Card className="example example-compact">
      <CardHeader title="Blog"/>
      <CardBody>
      <Formik
       initialValues={{
        title: record.title,
        id:record.id,
        image:record.image,
        shortdescription:record.shortdescription,
        description:record.description
       }}
       validationSchema={DisplayingErrorMessagesSchema}
       onSubmit={ async (values, { setSubmitting }) =>{
        // same shape as initial values         

        console.log(values);
         const val=await postPType(values);
        
        setSubmitting(false);      
       }}
     >
       {({ errors, touched,getFieldProps,setFieldValue,values }) => (
         <Form>
           <TextField
              name="title"
              id="standard-full-width"
                label="Input Title"
                placeholder="Title"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                {...getFieldProps("title")}
                
              />   
          {touched.title && errors.title && <div  style={{color:'red'}}>{errors.title}</div>}

          <TextField
              name="tsd"
              id="standard-full-width"
                label="Input short description"
                placeholder="Description"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                {...getFieldProps("shortdescription")}
                
              />   
          {touched.shortdescription && errors.shortdescription && <div  style={{color:'red'}}>{errors.shortdescription}</div>}
       
           <ReactQuill theme="snow" value={values.description} onChange={(e)=>{setFieldValue("description",e);console.log("sd",values.description)}}/>

                    {touched.description && errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}

           <div style={{ display: 'flex' }}>
                      <TextField
                        name="img"
                        id="img"
                        label="Upload Image"
                        style={{ margin: 8, width: '74%' }}
                        placeholder="...."
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        readOnly
                        value={image}

                      />
                      <label htmlFor="upload-photo" style={{ paddingTop: 27 }}>
                        <input
                        accept="image/*"
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="upload-photo"
                          type="file"
                          onChange={e => {
                            let file = e.target.files[0];
                            console.log(file)
                            let reader = new FileReader();
                            reader.onloadend = function () {
                              setFieldValue("image", reader.result)
                              setFieldValue("imgChange", true)
                              setImage(file.name)
                              
                              }

                            reader.readAsDataURL(file);

                          }

                          }

                        />
                        <Fab
                          color="secondary"
                          size="small"
                          component="span"
                          aria-label="add"
                          variant="extended"
                        >
                          <AddIcon /> Upload photo
      </Fab>
                      </label>
                    </div>

                    {touched.image && errors.image && <div style={{ color: 'red' }}>{errors.image}</div>}


           <Button disabled={loader } style={{marginLeft:'85%',marginTop:10,color:'white'}} type="submit" variant="contained" color="primary" className={classes.button}>
                Submit
      </Button>

      
         </Form>
       )}
     </Formik>
 </CardBody>
        </Card>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={setOpen}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
      />
      
      </div>
      </div>
    </>
    );
}
