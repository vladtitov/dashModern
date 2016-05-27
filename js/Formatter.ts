/**
 * Created by VladHome on 4/4/2016.
 */

 var Formatter = {
   formatTime: function(num){
        if(isNaN(num)) return '';
        var d = 0;
        var d =  Math.floor(num/24/60/60);
        var h = Math.floor(num/60/60-d*24);
        var min = Math.floor(num/60-(d*24*60)-(h*60));
        var sec = num-(min*60)-(h*60*60)-(d*24*60*60);
        return (d===0?'':d+'d ')+h+':'+(min<10?'0'+min:min)+':'+(sec<10?'0'+sec:sec);
    },
    time:function($view,val) {
       return $view.text(this.formatTime(val));

   },
    name: function($view,val){
        return  $view.text(val);
    },
    aux:function($view,val){
        var $old = $view;
        var $el =  $old.clone();
        setTimeout(()=>{
            $old.hide('slow',()=>{
                $old.remove();
            });
        },500);
        $el.appendTo($old.parent());
        $el.text(val);
        return $el;
    },
    icon: function($view,val){
        var $old = $view;
        var $el =  $old.clone();
        setTimeout(()=>{
            $old.hide('slow',()=>{
                $old.remove();
            });
        },500);
        $el.appendTo($old.parent());
        $el.attr('class', val);
        return $el;
        },
    time_color: function($view,val){
            return  $view.attr('class', val);
        },
        aux_color:function($view,val){
        return  $view.attr('class', val);
    }

}



/*
ItemValue.format['time']= function($view,val){
    return $view.text(formatTime(val));
}
ItemValue.format['name']= function($view,val){
    return  $view.text(val);
}
ItemValue.format['aux']= function($view,val){
    var $old = $view;
    var $el =  $old.clone();
    setTimeout(()=>{
        $old.hide('slow',()=>{
            $old.remove();
        });
    },500);
    $el.appendTo($old.parent());
    $el.text(val);
    return $el;
}
ItemValue.format['icon']= function($view,val){
    var $old = $view;
    var $el =  $old.clone();
    setTimeout(()=>{
        $old.hide('slow',()=>{
            $old.remove();
        });
    },500);
    $el.appendTo($old.parent());
    $el.attr('class', val);
    return $el;
}
ItemValue.format['time_color']= function($view,val){
    return  $view.attr('class', val);
}
ItemValue.format['aux_color']= function($view,val){
    return  $view.attr('class', val);
}
*/

