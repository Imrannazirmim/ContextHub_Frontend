
export const validationRules = {
    name:{
        required: 'Name is required',
        minLength: {
            value: 4,
            message: 'Name must be at least 4 characters'
        },
        maxLength: {
            value: 25,
            message: 'Name cannot exceed 25 characters'
        }
    },
    email: {
        required: 'Email is required',
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        }
    },
    password: {
        required: 'Password is required',
        minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',

        },
        maxLength: {
            value: 20,
            message: 'Password cannot exceed 20 characters'
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
            message: 'Password must be include uppercase,lowercase,number, and special characters'
        }
    },

    photo: {
        required: 'Photo is required',
        validate: {
            fileType: (files)=>{
                if(!files[0]) return 'Photo is required';
                const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
                return validTypes.includes(files[0].type) || 'Only JPG, PNG, and WEBP images are allowed'
            },
            fileSize: (files)=>{
                if(!files[0])return 'Photo is required'
                return files[0].size <= 5000000 || "File size must be less than 5MB";
        
            }
        }
    }

}