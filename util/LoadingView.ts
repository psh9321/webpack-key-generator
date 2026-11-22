export class LoadingView {
    /** loadingView classn name */
    className = "loadingView";

    /** loadingView가 append 될 부모 엘레멘트 */
    baseElement : HTMLElement | null = null;
    
    /** 현재 loadingView */
    view : HTMLElement | null = null;

    /** loadingView spinner svg */
    loadingSpinnerTemplate = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5C4DEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-loader-circle preview-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    `;

    constructor(baseElement : HTMLElement) {

        if(baseElement) {
            this.baseElement = baseElement;
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

    Render() {

        if(!this.baseElement) return console.log("loadingView.Render error : baseElement undefined", this.baseElement);

        this.view = this.CreateLoadingView();

        this.baseElement.append(this.view);
    }

    Remove() {

        if(!this.view) return /**console.log("loadingView undefined", this.view) */;

        this.view.remove();
        this.view = null;
    }
}