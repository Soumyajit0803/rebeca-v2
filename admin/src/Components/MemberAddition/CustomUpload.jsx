import React, { useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
const CustomUpload = ({fileList, onChange, onPreview}) => {
    // const [fileList, setFileList] = useState([]);
    // const onChange = ({ fileList: newFileList }) => {
    //     setFileList(newFileList);
    // };
    // const onPreview = async (file) => {
    //     let src = file.url;
    //     if (!src) {
    //         src = await new Promise((resolve) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj);
    //             reader.onload = () => resolve(reader.result);
    //         });
    //     }
    //     const image = new Image();
    //     image.src = src;
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(image.outerHTML);
    // };
    // console.log(fileList);

    return (
        <ImgCrop rotationSlider>
            <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
            >
                {fileList.length < 1 && "+ Upload"}
            </Upload>
        </ImgCrop>
    );
};
export default CustomUpload;
