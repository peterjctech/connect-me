export const sendPostRequest = async (url: string, data: Object) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
};
