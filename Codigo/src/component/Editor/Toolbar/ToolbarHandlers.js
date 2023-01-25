// export function getPictograms() {
//     fetch(`https://api.arasaac.org/api/pictograms/es/search/manzana`)
//         .then((response) => response.json())
//         .then(data => {
//             let items = [];
//             for (let i = 0; i < data.length && i < 20; i++) {
//                 items.push(`https://static.arasaac.org/pictograms/${data[i]._id}/${data[i]._id}_500.png`)
//             }
//         });
// }

// export function insertHeart(onClick) {
//     onClick(true);
// }