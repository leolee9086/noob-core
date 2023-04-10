export const getSelectionPosition = (nodeElement, range) => {
    if (!range) {
        range = getEditorRange(nodeElement);
    }
    if (!nodeElement.contains(range.startContainer)) {
        return {
            left: 0,
            top: 0,
        };
    }
    let cursorRect;
    if (range.getClientRects().length === 0) {
        if (range.startContainer.nodeType === 3) {
            // 空行时，会出现没有 br 的情况，需要根据父元素 <p> 获取位置信息
            const parent = range.startContainer.parentElement;
            if (parent && parent.getClientRects().length > 0) {
                cursorRect = parent.getClientRects()[0];
            } else {
                return {
                    left: 0,
                    top: 0,
                };
            }
        } else {
            const children = (range.startContainer ).children;
            if (children[range.startOffset] &&
                children[range.startOffset].getClientRects().length > 0) {
                // markdown 模式回车
                cursorRect = children[range.startOffset].getClientRects()[0];
            } else if (range.startContainer.childNodes.length > 0) {
                // in table or code block
                const cloneRange = range.cloneRange();
                range.selectNode(range.startContainer.childNodes[Math.max(0, range.startOffset - 1)]);
                cursorRect = range.getClientRects()[0];
                range.setEnd(cloneRange.endContainer, cloneRange.endOffset);
                range.setStart(cloneRange.startContainer, cloneRange.startOffset);
            } else {
                cursorRect = (range.startContainer ).getClientRects()[0];
            }
            if (!cursorRect) {
                let parentElement = range.startContainer.childNodes[range.startOffset] ;
                if (!parentElement) {
                    parentElement = range.startContainer.childNodes[range.startOffset - 1] ;
                }
                if (!parentElement) {
                    cursorRect = range.getBoundingClientRect();
                } else {
                    while (!parentElement.getClientRects || (parentElement.getClientRects && parentElement.getClientRects().length === 0)) {
                        parentElement = parentElement.parentElement;
                    }
                    cursorRect = parentElement.getClientRects()[0];
                }
            }
        }
    } else {
        const rects = range.getClientRects(); // 由于长度过长折行，光标在行首时有多个 rects https://github.com/siyuan-note/siyuan/issues/6156
        return {    // 选中多行不应遮挡第一行 https://github.com/siyuan-note/siyuan/issues/7541
            left: rects[rects.length - 1].left,
            top: rects[0].top
        };
    }

    return {
        left: cursorRect.left,
        top: cursorRect.top,
    };
};


export const getEditorRange = (element) => {
    let range;
    if (getSelection().rangeCount > 0) {
        range = getSelection().getRangeAt(0);
        if (element.isSameNode(range.startContainer) || element.contains(range.startContainer)) {
            return range;
        }
    }
    // 代码块过长，在代码块的下一个块前删除，代码块会滚动到顶部，因粗需要 preventScroll
    (element ).focus({preventScroll: true});
    let targetElement;
    if (element.classList.contains("table")) {
        // 当光标不在表格区域中时表格无法被复制 https://ld246.com/article/1650510736504
        targetElement = element.querySelector("th") || element.querySelector("td");
    } else {
        targetElement = getContenteditableElement(element);
        if (!targetElement) {
            targetElement = element;
        } else if (targetElement.tagName === "TABLE") {
            // 文档中开头为表格，获取错误 https://ld246.com/article/1663408335459?r=88250
            targetElement = targetElement.querySelector("th") || element.querySelector("td");
        }
    }
    range = targetElement.ownerDocument.createRange();
    range.setStart(targetElement || element, 0);
    range.collapse(true);
    return range;
};
export const getContenteditableElement = (element) => {
    if (!element || (element.getAttribute("contenteditable") === "true") && !element.classList.contains("protyle-wysiwyg")) {
        return element;
    }
    return element.querySelector('[contenteditable="true"]');
};