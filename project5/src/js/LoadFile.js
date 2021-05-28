/* LoadFile.js: file load and convert */


/* 
Json 파일 읽어서 object로 변환 => Promise return
filePath: index.html 기준으로 파일 위치. 파일명과 확장자 포함할 것
*/ 
export function loadJson(filePath){
    return fetch(filePath)
    .then(response => response.json())
    .then(json => {
        return json
    });
}
