(function(){TS.registerModule("pins",{pinned_status_changed_sig:new signals.Signal(),pinned_message_changed_sig:new signals.Signal(),pinned_message_deleted_sig:new signals.Signal(),onStart:function(){},pinFile:function(l,j){var k=TS.files.getFileById(l);
if(!k){return
}d(j,{file:k,type:"file"})
},unPinFile:function(m,j){var k=a(m,j);
if(!k){return
}var l={file:k,type:"file"};
e(l,j,function(){b(j,l)
})
},pinFileComment:function(l,m,j){var k=TS.files.getFileById(m);
if(!k){return
}var n=TS.files.getFileCommentById(k,l);
if(!n){return
}d(j,{file:k,comment:n,type:"file_comment"})
},unPinFileComment:function(l,n,j){var o=h(l,j);
var k=TS.files.getFileById(n);
if(!o||!k){return
}var m={file:k,comment:o,type:"file_comment"};
e(m,j,function(){b(j,m)
})
},pinMessage:function(l,j){l=l.toString();
var k=TS.utility.msgs.getMsg(l,j.msgs);
if(!k&&j._archive_msgs){k=TS.utility.msgs.getMsg(l,j._archive_msgs)
}if(k){if(k.subtype==="file_comment"){TS.pins.pinFileComment(k.comment.id,k.file.id,j)
}else{if(k.file){TS.pins.pinFile(k.file.id,j)
}else{d(j,{message:k,type:"message"})
}}}},unPinMessage:function(m,j){m=m.toString();
var l=i(m,j);
if(l){if(l.subtype==="file_comment"){TS.pins.unPinFileComment(l.comment.id,l.file.id,j)
}else{if(l.file){TS.pins.unPinFile(l.file.id,j)
}else{var k={message:l,type:"message"};
e(k,j,function(){b(j,k)
})
}}}},isMessagePinned:function(k,j){if(k.subtype==="file_comment"){return !!h(k.comment.id,j)
}else{if(k.file){return !!a(k.file.id,j)
}else{return !!i(k.ts,j)
}}},pinStatusHasChanged:function(r,q,p,j){var k,l,n;
var o,s,m;
if(p==="message"){k=TS.utility.msgs.getMsg(q.message.ts,j.msgs);
if(!k&&j._archive_msgs){k=TS.utility.msgs.getMsg(q.message.ts,j._archive_msgs)
}if(k){q.message=k;
o=g(r,k,j)
}TS.utility.msgs.maybeStoreMsgs(j.id,j.msgs)
}else{if(p==="file_comment"){m=TS.files.upsertFile(q.file);
l=TS.files.getFileById(q.file.id);
q.file=l;
n=TS.files.getFileCommentById(l,q.comment.id);
if(n){q.comment=n;
o=g(r,n,j)
}else{n=TS.files.addCommentToFile(q.comment,l);
q.comment=n
}o=o||m.status==="CHANGED"
}else{if(p==="file"){m=TS.files.upsertFile(q.file);
l=TS.files.getFileById(q.file.id);
q.file=l;
o=g(r,l,j);
o=o||m.status==="CHANGED"
}}}if(q.file){TS.files.makeSureReferencesGetSavedToLS(q.file.id)
}s=c(r,q,p,j);
if(o||s){TS.pins.pinned_status_changed_sig.dispatch(j,q)
}},upsertPinnedItems:function(j){j.forEach(function(k){if(k.type==="file"){TS.files.upsertFile(k.file);
k.file=TS.files.getFileById(k.file.id)
}else{if(k.type==="file_comment"){TS.files.upsertFile(k.file);
k.file=TS.files.getFileById(k.file.id);
var l=TS.files.getFileCommentById(k.file,k.comment.id);
if(!l){l=TS.files.addCommentToFile(k.comment,k.file)
}k.comment=l
}}})
},replaceMsg:function(k,j){if(!j.pinned_items){return
}j.pinned_items.forEach(function(l){if(l.type==="message"&&l.message.ts===k.ts){l.message=k;
TS.pins.pinned_message_changed_sig.dispatch(j,l)
}})
},removeMsg:function(k,j){if(!j.pinned_items){return
}c(false,{message:{ts:k}},"message",j);
TS.pins.pinned_message_deleted_sig.dispatch(j)
}});
var a=function(m,j){if(!j.pinned_items){return
}var l;
for(var k=0;
k<j.pinned_items.length;
k++){l=j.pinned_items[k];
if(l.type==="file"&&l.file.id===m){return l.file
}}return null
};
var h=function(l,j){if(!j.pinned_items){return
}var m;
for(var k=0;
k<j.pinned_items.length;
k++){m=j.pinned_items[k];
if(m.type==="file_comment"&&m.comment.id===l){return m.comment
}}return null
};
var i=function(n,j){if(!j.pinned_items){return
}var l;
for(var k=0;
k<j.pinned_items.length;
k++){l=j.pinned_items[k];
if(l.type==="message"&&l.message.ts===n){return l.message
}}var m=TS.utility.msgs.getMsg(n,j.msgs);
if(!m&&j._archive_msgs){m=TS.utility.msgs.getMsg(n,j._archive_msgs)
}if(!m){return null
}if(m.subtype==="file_comment"){if(h(m.comment.id,j)){return m
}}else{if(m.file){if(a(m.file.id,j)){return m
}}}return null
};
var g=function(l,m,j){var n=false;
if(!m.pinned_to){m.pinned_to=[]
}if(l){if(m.pinned_to.indexOf(j.id)===-1){m.pinned_to.push(j.id);
n=true
}}else{var k=m.pinned_to.indexOf(j.id);
if(k!==-1){m.pinned_to.splice(k,1);
n=true
}}return n
};
var c=function(l,m,k,j){var o=false;
if(!j.pinned_items){j.pinned_items=[]
}var n=-1;
j.pinned_items.some(function(q,p){var r=false;
if(k==="message"&&q.type==="message"){if(q.message.ts===m.message.ts){r=true
}}else{if(k==="file"&&q.type==="file"){if(q.file.id===m.file.id){r=true
}}else{if(k==="file_comment"&&q.type==="file_comment"){if(q.comment.id===m.comment.id){r=true
}}}}if(r){n=p;
return true
}});
if(!l&&n!==-1){j.pinned_items.splice(n,1);
o=true
}else{if(l&&n===-1){j.pinned_items.unshift(m);
o=true
}}return o
};
var d=function(j,l){var k=f(j,l);
TS.api.call("pins.add",k,function(m,n){if(!m){if(n.error!=="already_pinned"){return
}}TS.pins.pinStatusHasChanged(true,l,l.type,j)
})
};
var b=function(j,l){var k=f(j,l);
TS.api.call("pins.remove",k,function(m,n){if(!m){if(n.error!=="not_pinned"){return
}}TS.pins.pinStatusHasChanged(false,l,l.type,j)
})
};
var f=function(j,l){var k={channel:j.id};
if(l.type==="message"){k.timestamp=l.message.ts
}else{if(l.type==="file"){k.file=l.file.id
}else{if(l.type==="file_comment"){k.file_comment=l.comment.id
}}}return k
};
var e=function(l,j,m){TS.client.channel_page.highlightPinnedItemForRemoval(l);
var k=TS.client.channel_page.pinnedItemHtml(l,j);
TS.generic_dialog.start({title:"Remove Pinned Item",body:"<p>Are you sure you want to remove this pinned item?</p>"+k,go_button_text:"Yes, remove this pinned item",on_go:m,on_cancel:function(){TS.client.channel_page.unHighlightPinnedItemForRemoval(l)
}})
}
})();