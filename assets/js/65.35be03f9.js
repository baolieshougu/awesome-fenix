(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{498:function(t,i,e){"use strict";e.r(i);var r=e(11),a=Object(r.a)({},(function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"透明多级分流系统"}},[t._v("透明多级分流系统")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("奥卡姆剃刀原则")]),t._v(" "),e("p",[t._v("entities should not be multiplied without necessity")]),t._v(" "),e("p",[t._v("如无必要，勿增实体")]),t._v(" "),e("div",{staticClass:"custom-block right"},[e("p",[t._v("—— "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Occam%27s_razor",target:"_blank",rel:"noopener noreferrer"}},[t._v("Occam's Razor"),e("OutboundLink")],1),t._v("，"),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/William_of_Ockham",target:"_blank",rel:"noopener noreferrer"}},[t._v("William of Ockham"),e("OutboundLink")],1)])])]),t._v(" "),e("p",[t._v("现代的企业级或互联网系统，“分流”是必须要考虑的设计，分流所使用手段数量之多、涉及场景之广，可能到了连它的开发者本身都未必能全部意识到程度。这听起来似乎并不合理，但笔者认为这恰好是优秀架构设计的一种体现，“分布广阔”源于“多级”，“意识不到”谓之“透明”，也即是本章我们要讨论的主题“"),e("strong",[t._v("透明多级分流系统")]),t._v("”（Transparent Multilevel Diversion System，这个词是笔者自己创造的，业内通常只提“Transparent Multilevel Cache”，但我们这里谈的并不仅仅涉及到缓存）的来由。")]),t._v(" "),e("p",[t._v("用户使用信息系统的过程中，请求从浏览器出发，在DNS的指引下找到系统的入口，经过网关、负载均衡器、缓存、服务集群等一系列设施，最后触及到末端存储于数据库服务器中的信息，然后再逐级返回到用户的浏览器之中。这其中要经过许许多多的技术部件。作为系统的设计者，我们应该意识到不同的设施、部件在系统中有各自不同的价值：")]),t._v(" "),e("ul",[e("li",[t._v("有一些部件位于客户端或网络的边缘，能够迅速响应用户的请求，避免给后方的I/O与CPU带来压力，典型如本地缓存、内容分发网络、反向代理等。")]),t._v(" "),e("li",[t._v("有一些部件处理能力能够线性拓展，易于伸缩，可以使用较小的代价堆叠机器来获得与用户数量相匹配的并发性能，应尽量作为业务逻辑的主要载体，典型如集群中能够自动扩缩的服务节点。")]),t._v(" "),e("li",[t._v("有一些部件稳定服务对系统运行有全局性的影响，要时刻保持着容错备份，维护着高可用性，典型如服务注册中心、配置中心。")]),t._v(" "),e("li",[t._v("也有一些设施是天生的单点部件，只能依靠升级机器本身的网络、存储和运算性能来提升处理能力，如位于系统入口的路由、网关或者负载均衡器（它们都可以做集群，但一次网络请求中无可避免至少有一个是单点的部件）、位于请求调用链末端的传统关系数据库等，都是典型的容易形成单点部件。")])]),t._v(" "),e("p",[t._v("对系统进行流量规划时，我们应该充分理解这些部件的价值差异，有两个简单、普适的原则能指导我们进行设计：一个原则是尽可能减少单点部件，如果某些单点是无可避免的，则应尽最大限度减少到达单点部件的流量。举个例子，用户请求在系统中往往会有多个部件都能够处理，譬如要获取一张图片，浏览器缓存、CDN、反向代理、Web服务器、文件服务器、数据库都有可能提供这张图片。恰如其分地引导请求分流至最合适的组件中，避免绝大多数流量汇集到单点部件（如数据库），同时仍能够（或者在绝大多数时候）保证处理结果的准确性，仍能在单点系统出现故障时自动而迅速地实施补救措施，这便架构设计中多级分流的原则。")]),t._v(" "),e("p",[t._v("缓存、节流、主备、负载均衡等措施，是为了达成该目标所采用的工具与手段，而高可用架构、高并发架构则是通过该原则所获得的价值。许多介绍架构设计的资料中，会以“高可用、高并发架构”为主题来讲解这一部分内容。在本文档中，笔者选择以流量流经的部件为脉络，以“透明多级分流系统”为题介绍，这两者实质上内容是一样的。按从前（用户端）到后（服务端）的顺序，我们会讨论以下设施的运作和原理：")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"./client-cache"}},[e("strong",[t._v("客户端缓存")])]),t._v("（Client Cache）：HTTP协议的无状态性决定了它必须依靠客户端缓存来解决网络传输效率上的缺陷。")]),t._v(" "),e("li",[e("a",{attrs:{href:"./dns-lookup"}},[e("strong",[t._v("域名解析")])]),t._v("（DNS Lookup）：DNS也许是全世界最大、使用最频繁的信息查询系统，如果没有适当的分流机制，DNS将会成为整个网络的瓶颈。")]),t._v(" "),e("li",[e("a",{attrs:{href:"./transmission-optimization"}},[e("strong",[t._v("传输链路")])]),t._v("（Transmission Optimization）：今天的传输链路优化原则，在若干年后的未来再回头看它们时，其中多数已经成了奇技淫巧，有些甚至成了反模式。")]),t._v(" "),e("li",[e("a",{attrs:{href:"./cdn"}},[e("strong",[t._v("内容分发网络")])]),t._v("（Content Distribution Network）：CDN是一种十分古老而又十分透明，没什么存在感的分流系统，许多人都说听过它，但甚少人真正去了解过它。")]),t._v(" "),e("li",[e("a",{attrs:{href:"./load-balancing"}},[e("strong",[t._v("负载均衡")])]),t._v("（Load Balancing）：调度后方的多台机器，以统一的接口对外提供服务，承担此职责的技术组件被称为“负载均衡”。")]),t._v(" "),e("li",[e("a",{attrs:{href:"./cache-middleware"}},[e("strong",[t._v("缓存")])]),t._v("（Cache）：软件开发中的缓存并非多多益善，它有收益，也有风险。")])]),t._v(" "),e("p",[t._v("同时也应当说明的是另一个，可能是更关键重要的原则：奥卡姆剃刀原则。作为一个设计者，你对以上讨论的多级分流的手段应该有全面的理解与充分的准备，但这些设施并不是越多越好。实际构建系统时，应当在有明确需求，真正有必要的时候再去考虑部署它们，不是每一个系统都需要时刻高并发高可用的保障，根据系统的用户量、峰值流量和团队本身的技术与运维能力出发来考虑如何布置这些设施才是合理的做法，能满足需求的前提下，"),e("strong",[t._v("最简单的系统就是最好的系统")]),t._v("。")])])}),[],!1,null,null,null);i.default=a.exports}}]);