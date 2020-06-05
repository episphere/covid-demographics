console.log('cdemo.js loaded')

cdemo = {}
cdemo.ui = (div='cdemoDiv')=>{
    if (typeof (div) == 'string') {
        div = document.getElementById(div)
    }
    if (div) {
        let h = `<p>Hello at ${Date()}</p>`
        div.innerHTML = h
    }
}

cdemo.getAgeGenderData = async(url='https://data.cdc.gov/resource/9bhg-hcku.json?$limit=10000')=>{
    cdemo.data = cdemo.data || {}
    cdemo.data.ageGender = await (await fetch(url)).json()
    //clean types
    cdemo.data.ageGender = cdemo.data.ageGender.map(x=>{
        // parse dates
        ["data_as_of", "start_week", "end_week"].forEach(p=>{
            x[p] = new Date(x[p])
        });
        ["covid_19_deaths","total_deaths","pneumonia_deaths","pneumonia_and_covid_19_deaths","influenza_deaths","pneumonia_influenza_or_covid"].forEach(p=>{
            x[p]=parseInt(x[p])
        })
        return x
    })
    return cdemo.data.ageGender
}

if (typeof (define) != 'undefined') {
    define(cdemo)
}
