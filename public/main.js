fetch('http://localhost:9090/list')
    .then(data=>data.json())
        .then(answer=>{
            listAPI=answer;
            refresh();
        })
