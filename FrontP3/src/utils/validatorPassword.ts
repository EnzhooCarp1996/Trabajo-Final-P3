export const validateConfirmPassword = (form: any) => ({
    validator(_: any, value: string) {
        if (!value || form.getFieldValue("password") === value) {
            return Promise.resolve();
        }
        return Promise.reject("Las contraseñas no coinciden");
    }
});
