describe("Timezone Test", () => {
    it("should go to time.is", () => {
        browser.url("https://time.is/");
        const timeIstime = $("#clock")
        console.log(`Wall clock time according to time.is: ${timeIstime.getText()}`)

    })

    it("should get time from JS Date class", ()=> {

        var dateinfo = browser.execute(()=> {
            return Date().toString()
        });
        console.log(`Date from browser JS: ${dateinfo}`);
    
    })

})