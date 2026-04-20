export const success = (data = {}, status = 200) => ({ success: true, ...data });
export const fail = (code, message) => ({ success: false, code, message });