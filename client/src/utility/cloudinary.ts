import Axios from "axios";

const url = import.meta.env.VITE_CLOUDINARY_URL;
const preset = import.meta.env.VITE_CLOUDINARY_PRESET;

const formatFile = async (file: any) => {
    const formData = new FormData();

    if (file !== undefined) {
        formData.append('file', file!);
        formData.append('upload_preset', preset!);
    }

    const res = await Axios.post(url!, formData);
    const imageUrl = res.data.secure_url;

    return imageUrl;

}

export function cloudinary(file: any) {
    return formatFile(file);
}