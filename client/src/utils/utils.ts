export const getCodeList = (group_code: string) => {
    let params = {
      group_code: group_code,
    }

    fetch('http://localhost:3000/api/code/getCodeList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ getCodeList ~ data:", data)
      });
}