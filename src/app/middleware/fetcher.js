const fetcher=(url)=>fetch(url).then((res)=>res.json());
module.exports(fetcher);

