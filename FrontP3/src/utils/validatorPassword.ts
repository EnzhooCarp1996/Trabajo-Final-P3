export const validateConfirmPassword = (form: any) => ({
    validator(_: any, value: string) {
        if (form.getFieldValue("password") === value) {
            return Promise.resolve();
        }
        return Promise.reject("Las contraseñas no coinciden");
    }
});
