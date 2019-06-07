function setShow (className, arrowName, e) {
	let target;
	let targetData;
	let arrow;
	e.target.classList.contains(className) ? target = e.target : target = e.target.parentNode;

	targetData = target.getAttribute("data-target");
	for (let child of target.childNodes){
		if (child.classList.contains("fa")) arrow = child
	}

	if (document.querySelector(`#${targetData}`).getAttribute("class") === "collapse") {
		document.querySelector(`#${targetData}`).setAttribute("class", "collapse show");
		arrow.setAttribute("class", `fa fa-${arrowName}-up`);
	} else {
		document.querySelector(`#${targetData}`).setAttribute("class", "collapse");
		arrow.setAttribute("class", `fa fa-${arrowName}-down`);
	}
}


function setShowDate(e) {
	setShow("docsByDate__header-btn", "chevron",e);

}

function setShowProducts(e) {
	setShow("products__header-btn", "caret", e);
}

window.onload = function () {
	document.querySelectorAll(".docsByDate__header-btn").forEach(item => item.addEventListener("click", setShowDate));
	document.querySelectorAll(".products__header-btn").forEach(item => item.addEventListener("click", setShowProducts));
};