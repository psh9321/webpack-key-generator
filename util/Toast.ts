export class Toast {

    toastId = "toast"

    constructor(contents : string) {

        const toastPopup = this.CreateToast(contents);

        if(toastPopup instanceof HTMLDivElement) {
            document.body.append(toastPopup);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    toastPopup.classList.add("on");

                    const timer = setTimeout(() => {
                        
                        toastPopup.addEventListener("transitionend", this.TransitionEnd.bind(this));
                        toastPopup.classList.remove("on")

                        clearTimeout(timer);
                        
                    },3000)
                })
            })
        }
        else {
            console.log("toast CreateToast error", toastPopup);
        }
    }

    CreateToast(contents : string) {

        if(!contents) return console.log("CreateToast contents undefined", contents)

        const wrapperElement = document.createElement("div");
        const ContentsElement = document.createElement("p");

        wrapperElement.id = this.toastId;

        ContentsElement.innerHTML = contents;

        wrapperElement.append(ContentsElement);

        return wrapperElement
    }

    TransitionEnd(e : TransitionEvent) {
        const toast = document.getElementById(this.toastId);

        if(e.propertyName !== "bottom") return 

        toast?.removeEventListener("transitionend",this.TransitionEnd);
        toast?.remove();
    }
}