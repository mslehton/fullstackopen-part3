(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(e,t,n){e.exports=n(43)},22:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(10),i=n.n(o),s=(n(22),n(11)),u=n(12),l=n(14),c=n(13),m=n(15),f=n(2),h=n.n(f),d="/api/persons",p={getAll:function(){return h.a.get(d)},create:function(e){return h.a.post(d,e)},update:function(e,t){return h.a.put("".concat(d,"/").concat(e),t)},remove:function(e){return h.a.delete("".concat(d,"/").concat(e))}},w=function(e){return r.a.createElement("div",null,r.a.createElement("h3",null,"Numerot"),r.a.createElement("table",null,r.a.createElement("tbody",null,e.persons.map(function(t){return r.a.createElement(v,{person:t,key:t.name,f:e.f})}))))},v=function(e){return r.a.createElement("tr",{key:e.person.name},r.a.createElement("td",null,e.person.name),r.a.createElement("td",null,e.person.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:e.f(e.person.id,e.person.name)},"Poista")))},b=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"Notification"},t)},N=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(c.a)(t).call(this,e))).findStr=function(e,t){for(var n=0;n<e.length;n++)if(e[n].name===t)return n;return-1},n.addPerson=function(e){e.preventDefault();var t=n.findStr(n.state.persons,n.state.newName),a={name:n.state.newName,number:n.state.newNumber};if(t<0)p.create(a).then(function(e){n.setState({persons:n.state.persons.concat(e.data),newName:"",newNumber:"",notification:"Lis\xe4ttiin "+n.state.newName})});else{if(!window.confirm(n.state.newName+" on jo luettelossa. Korvataanko vanha numero uudella?"))return;var r=n.state.persons[t].id;p.update(r,a).then(function(e){n.setState({persons:n.state.persons.map(function(t){return t.id!==r?t:e.data}),newName:"",newNumber:"",notification:"Muokattiin "+n.state.newName})}).catch(function(e){p.create(a).then(function(e){n.setState({persons:n.state.persons.map(function(t){return t.id!==r?t:e.data}),newName:"",newNumber:"",notification:"Muokattiin "+n.state.newName})})})}setTimeout(function(){n.setState({notification:null})},5e3)},n.removePerson=function(e,t){return function(){window.confirm("Poistetaanko "+t+"?")&&p.remove(e).then(function(a){n.setState({persons:n.state.persons.filter(function(t){return t.id!==e}),newName:"",newNumber:"",notification:"Poistettiin "+t})}),setTimeout(function(){n.setState({notification:null})},5e3)}},n.handleNameChange=function(e){n.setState({newName:e.target.value})},n.handleNumberChange=function(e){n.setState({newNumber:e.target.value})},n.handleFilterChange=function(e){n.setState({filter:e.target.value.toLowerCase()})},n.state={persons:[],newName:"",newNumber:"",filter:"",notification:null},n}return Object(m.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.getAll().then(function(t){e.setState({persons:t.data})})}},{key:"render",value:function(){var e=this,t=this.state.persons.filter(function(t){return t.name.toLowerCase().indexOf(e.state.filter)>=0});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(b,{message:this.state.notification}),"rajaa n\xe4ytett\xe4vi\xe4 ",r.a.createElement("input",{value:this.state.filter,onChange:this.handleFilterChange}),r.a.createElement("h3",null,"Lis\xe4\xe4 uusi"),r.a.createElement("form",{onSubmit:this.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:this.state.newName,onChange:this.handleNameChange}),r.a.createElement("br",null),"puhelinnumber: ",r.a.createElement("input",{value:this.state.newNumber,onChange:this.handleNumberChange}),r.a.createElement("br",null),r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))),r.a.createElement(w,{persons:t,filter:this.state.filter,f:this.removePerson}))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.01a80fe6.chunk.js.map