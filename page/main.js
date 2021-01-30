$(function(){
    var prodRowCopy = $('.bl-product:first').parent().clone();
    var prodLeftCopy = $(".bl-product-left:first").clone();

    function distributeOrder() {
        $(".bl-product-left").each(function (index) {
            $(this).css("order",""+index);
        })
    }

    distributeOrder();
    // let Products = [];
    // class Product{
    //     constructor() {
    //         this.productRow = null;
    //         this.productLeft = null;
    //     }
    //     setProductRow(productRow){
    //         this.productRow = productRow;
    //     }
    //     setProductLeft(productLeft){
    //         this.productLeft = productLeft;
    //     }
    //     getProductRow(){
    //         return this.productRow;
    //     }
    //     getProductLeft(){
    //         return this.productLeft;
    //     }
    // }
    //
    // function fillProductsArray() {
    //     $("bl-product").each(function (index){
    //         var prodRow = $(this).parent();
    //
    //         function findProdLeftIndex(index) {
    //             $("")
    //             return undefined;
    //         }
    //
    //         var prodLeft = findProdLeftIndex(index);
    //     })
    // }

    // fillProductsArray();


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
        var prod_new = prodRowCopy.clone();
        prod_new.children(".bl-product").children("input").attr("value",text);
        prod_new.children(".bl-count").children("span").text(count);
        return prod_new;
    }
    //Function that create new product circle(left) by text and primary count;
    function createNewProductLeft(text, count, index) {
        var prod_new = prodLeftCopy.clone();
        prod_new.children(".bl-product-name").text(text);
        prod_new.children(".bl-product-num").attr("value",count);
        prod_new.css("order",""+index);
        return prod_new;
    }
    //Change name of product
        $(document).on('keyup','.bl-name-product',function (){
        var text = $(this).val();
        function renameProd(text, prodRow) {
            var $prod = findLeftProd(prodRow);
            $prod.children(".bl-product-name").text(text);
        }

       renameProd(text, $(this).parent().parent());
    })

    $(document).on('click','.minus,.plus',function (){
        function changeNumProduct(number, button) {
            let $row = button.parent().parent();
            let num = $row.find(".bl-count .bl-label");
            let newNum = parseInt(num.text())+number;
            let $count =  $row.children(".bl-count").find(".bl-label");
            $count.fadeOut(200,function () {
                checkColor(num.text(),newNum,button);
                if(newNum>=1) num.text(newNum);
                $count.fadeIn(200);
            })
            function checkColor(oldN,newN,button) {
                button = button.parent().children(".minus");
                console.log("Old: "+oldN+" NEW: "+newN);
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
        var index = 0;
        index = prodRow.index()-1;
        if(!prodRow.hasClass('bl-bought-row')) return eq($(".bl-left:first .bl-product-left"),index);
        else return eq($(".bl-left:last .bl-product-left"),index);

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

