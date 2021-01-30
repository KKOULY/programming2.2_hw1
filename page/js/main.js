$(function(){
    let PROD_ROW_COPY = $('.bl-product:first').parent().clone();
    let PROD_LEFT_COPY = $(".bl-product-left:first").clone();

    distributeOrder();

    function distributeOrder() {
        $(".bl-product-left").each(function (index) {
            $(this).css("order",""+index);
        })
    }

    //Bought button click change row
    $(document).on('click','.bought-button',function (){
        var row = $(this).parent().parent();
        row.fadeOut(300,function () {
            if(row.hasClass("bl-bought-row")){
                rearrangeProd(row,1);
                row.removeClass("bl-bought-row");
                row.find(".bl-name-product").attr("disabled",false);
                row.find(".bought-button").text("Куплено");
            } else {
                rearrangeProd(row,-1);
                row.addClass("bl-bought-row");
                row.find(".bl-name-product").attr("disabled",true);
                row.find(".bought-button").text("Не куплено");
            }
            row.fadeIn(300);
        })
        function rearrangeProd(prodRow,point) {
            if(point!==0) {
                var prod = findLeftProd(prodRow);
                var prodClone = prod.clone();
                prod.remove();
                if(point > 0){
                    $(".bl-left:first").append(prodClone);
                }else $(".bl-left:last").append(prodClone);
            }
        }
    })

    /*Button add that create new product*/
    $(".bl-button.bl-button-add").click(function () {
        var searchField = $(".bl-search");
        var text = searchField.val();
        if(!text.localeCompare("")) return null;
        var prod_new = createNewProduct(text, "1");
        $(".bl-column-list").children().append(prod_new);
        var prod_left_new = createNewProductLeft(text,"1",prod_new.index()-1);
        $(".bl-column-bought").find(".bl-left:first").append(prod_left_new);
        searchField.val("").focus();
    })
    //Function that create new product ROW by text and primary count
    function createNewProduct(text, count){
        var prod_new = PROD_ROW_COPY.clone();
        prod_new.children(".bl-product").children("input").attr("value",text);
        prod_new.children(".bl-count").children("span").text(count);
        return prod_new;
    }
    //Function that create new product circle(left) by text and primary count;
    function createNewProductLeft(text, count, index) {
        let prod_new = PROD_LEFT_COPY.clone();
        prod_new.children(".bl-product-name").text(text);
        prod_new.children(".bl-product-num").attr("value",count);
        prod_new.css("order",""+index);
        return prod_new;
    }
    //Change name of product
        $(document).on('keyup','.bl-name-product',function (){
        let text = $(this).val();
        function renameProd(text, prodRow) {
            let $prod = findLeftProd(prodRow);
            $prod.children(".bl-product-name").text(text);
        }
        renameProd(text, $(this).parent().parent());
    })
    //Delete product
    $(document).on('click','.delete',function (){
        let $row = $(this).parent().parent();
        let $prodLeft = findLeftProd($row);

        function rearrangeOrder(number) {
            $(".bl-product-left").each(function () {
                let $prod = $(this);
                if(number<$prod.css("order")){
                    let newOrder = parseInt($prod.css("order"));
                    $prod.css("order",newOrder-1+"");
                }
            })
        }

        rearrangeOrder($row.index()-1);
        $prodLeft.remove();
        $row.remove();
    })

    $(document).on('click','.minus,.plus',function (){
        function changeNumProduct(number, button) {
            let $row = button.parent().parent();
            let num = $row.find(".bl-count .bl-label");
            let newNum = parseInt(num.text())+number;
            let $count =  $row.children(".bl-count").find(".bl-label");
            if(!button.hasClass("turn-off")) {
                $count.fadeOut(200, function () {
                    checkColor(num.text(), newNum, button);
                    if (newNum >= 1) {
                        num.text(newNum);
                        let prodLeft = findLeftProd($row);
                        console.log(prodLeft.html());
                        prodLeft.children(".bl-product-num").text(newNum);
                    }
                    $count.fadeIn(200);
                })
            }
            function checkColor(oldN,newN,button) {
                button = button.parent().children(".minus");
                if(oldN==1 && newN==2) {
                    button.addClass("turn-on");
                    button.removeClass("turn-off");
                }
                else if(newN==1 && oldN>1) {
                    button.removeClass("turn-on");
                   button.addClass("turn-off");
                }
            }
        }
        if($(this).hasClass("minus")) changeNumProduct(-1,$(this));
        else if($(this).hasClass("plus")) changeNumProduct(1,$(this));
    })

    function findLeftProd(prodRow){
        let index = prodRow.index()-1;
        return eq(".bl-product-left",index);
    }

    function eq(selector,index){
        let $block = $(selector);
        let res = $block.eq(index);
        $block.each(function () {
            if(index == $(this).css("order")) {
               res = $(this);
            }
        })
        return res;
    }


});

