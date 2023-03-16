import {
  Box,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Grid,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import * as yup from "yup";
import makeAnimated from "react-select/animated";
import { Spacer } from "@nextui-org/react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function CreateSupportRequest() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const animatedComponents = makeAnimated();
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const option = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: 1,
    label: "Account",
  });
  const title = useRef("");

  const checkoutSchema = yup.object().shape({
    requestName: yup.string().required("Required"),
    title: yup.string().required("Required"),
    comment: yup.string().required("Required"),
  });

  function handleUpload(event) {
    setFile(event.target.files[0]);
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleFormSubmit = (values) => {
    console.log(values);
  };
  const initialValues = {
    requestName: "",
    title: "",
    comment: "",
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    function getListCategory() {
      axios
        .get(
          "http://localhost:5010/api/SupportRequestCategory/GetList?Page=0&PageSize=10"
        )
        .then((response) => {
          const a = response.data.items;
          a &&
            a.map((value) => {
              option.push({
                value: value.id,
                label: value.name,
              });
              return option;
            });
        });
    }
    getListCategory();

    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState, option]);

  console.log(option);
  const handleChangeSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  function createSupportRequests() {
    var supportRequest = {
      title: title.current.value,
      comment: content,
      imageUrl: file.name,
      supportRequestCategoryId: selectedOption.value,
      userId: 4,
    };
    console.log(supportRequest);
    axios
      .post("http://localhost:5010/api/SupportRequest/Create", supportRequest)
      .then((response) => {
        toast.success("Created Successfully!", {
          position: "top-right",
          onClose: () => {
            window.location.reload(false);
          },
          autoClose: 200,
        });
      })
      .catch((error) => console.log(error.message))
      .finally();
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="../supportRequest">
          Support Request
        </Link>
        <Typography color="text.primary">Create</Typography>
      </Breadcrumbs>
      <Spacer y={1} />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Title"
                name="title"
                onBlur={handleBlur}
                onChange={handleChange}
                inputRef={title}
                value={values.title}
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <div id="upload-box">
                <input type="file" onChange={handleUpload} />
              </div>
              <Grid item sx={{ gridColumn: "span 4" }}>
                <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                <Spacer y={0.5} />
                <Select
                  closeMenuOnSelect={false}
                  value={selectedOption}
                  onChange={handleChangeSelect}
                  components={animatedComponents}
                  options={option}
                />
              </Grid>
              <Grid item sx={{ gridColumn: "span 4" }}>
                <Editor
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}
                />
              </Grid>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                onClick={createSupportRequests}
              >
                Create New Support Request
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </Container>
  );
}
