import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiUploadCloud } from "react-icons/fi";
import useAuth from "../../Hooks/useAuth.jsx";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CreateContest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const IMAGE_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
    const response = await axios.post(IMAGE_API_URL, formData);
    console.log("image", response.data);
    return response.data.data.display_url;
  };

  const handleContestForm = async (data) => {
    try {
      setLoading(true);
      const file = data.image?.[0];
      if (!file) {
        setLoading(false);
        return toast.error("Please upload an image");
      }
      const imageUrl = await uploadImage(file);
      const postData = {
        ...data,
        image: imageUrl,
        creatorEmail: user.email,
        status: "pending",
      };
      const res = await axiosSecure.post("/contest", postData);
      console.log("server response", res.data);
      toast.success("Contest create successfull");
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="w-full max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Create a New Contest</h2>
          <p className="text-slate-700 text-sm">
            Fill out the details below to launch your next successful contest.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(handleContestForm)}
          className="bg-white p-6 rounded-xl shadow space-y-6"
        >
          {/* Contest Name */}
          <div className="form-control flex flex-col gap-1">
            <label className="label font-medium">Contest Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., Summer Logo Challenge"
              {...register("name", { required: "Contest Name is required" })}
            />
            {errors.name && (
              <p className="text-error text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div className="form-control flex flex-col gap-2">
            <label className="label font-medium">Cover Image</label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-base-200">
              <FiUploadCloud className="text-3xl mb-2 opacity-60" />
              <span className="text-sm font-medium opacity-80">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG or GIF (MAX. 800×400px)
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image")}
              />
            </label>
          </div>

          {/* Description */}
          <div className="form-control flex flex-col gap-1">
            <label className="label font-medium">Description</label>
            <textarea
              className="textarea w-full textarea-bordered h-28 resize-none"
              placeholder="Describe your contest"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-error text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Entry Fee + Prize */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Entry Fee ($)</label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="e.g., 10"
                {...register("entryFee", { required: true })}
              />
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-medium">Prize ($)</label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="e.g., 500"
                {...register("prize", { required: true })}
              />
            </div>
          </div>

          {/* Dropdown + Deadline */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-medium">Contest Type</label>
              <select
                className="select select-bordered w-full"
                defaultValue="Design"
                {...register("contestType")}
              >
                <option>Design</option>
                <option>Games</option>
                <option>Development</option>
                <option>Art</option>
                <option>Writing</option>
                <option>Photography</option>
                <option>Videos</option>
              </select>
            </div>

            <div className="form-control flex flex-col">
              <label className="label font-medium">Deadline</label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("deadline", { required: true })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" className="btn btn-outline btn-primary">
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </form>
      </section>
      <Toaster />
    </>
  );
};

export default CreateContest;
