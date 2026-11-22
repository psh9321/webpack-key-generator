export class LoadingView {
    className = "loadingView";
    
    view : HTMLElement | null = null;

    loadingSpinnerTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C4DEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle preview-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    `;

    constructor(baseElement : HTMLElement) {

        if(baseElement) {
            console.log(this.view)
            this.view = this.CreateLoadingView();

            baseElement.append(this.view);
        }
        else {
            console.log("LoadingView params baseElement undefined", baseElement)
        }
    }

    CreateLoadingView() {

        const loadingView = document.createElement("div");

        loadingView.setAttribute("class",this.className);

        loadingView.innerHTML = this.loadingSpinnerTemplate;

        return loadingView
    }

    Remove() {

        if(!this.view) return console.log("loadingView undefined", this.view);

        this.view.remove();
        this.view = null;
    }
}