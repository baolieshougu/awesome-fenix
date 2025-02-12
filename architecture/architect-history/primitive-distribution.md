# 原始分布式时代

:::tip UNIX 的分布式设计哲学

Simplicity of both the interface and the implementation are more important than any other attributes of the system — including correctness, consistency, and completeness

保持接口与实现的简单性，比系统的任何其他属性，包括准确性、一致性和完整性，都来得更加重要。

:::right

—— [Richard P. Gabriel](https://en.wikipedia.org/wiki/Richard_P._Gabriel)，[The Rise of 'Worse is Better'](https://en.wikipedia.org/wiki/Worse_is_better)，1991

:::

可能与绝大多数人心中的认知会有差异，“使用多个独立的分布式服务共同构建一个更大型系统”的设想与实际尝试，反而要比今天大家所了解的大型单体系统出现的时间更早。

在 20 世纪 70 年代末期到 80 年代初，计算机科学刚经历了从以大型机为主向以微型机为主的蜕变，计算机逐渐从一种存在于研究机构、实验室当中的科研设备，转变为存在于商业企业中的生产设备，甚至是面向家庭、个人用户的娱乐设备。此时的微型计算机系统通常具有 16 位寄存器、不足 5MHz 时钟频率的处理器，不超过 1 MB 的最大内存和 64KB 单段偏移地址。譬如著名的英特尔处理器的鼻祖，[Intel 8086 处理器](https://zh.wikipedia.org/zh-tw/Intel_8086)就是在 1978 年研制成功，流行于 80 年代中期，甚至一直持续到 90 年代初期仍有生产销售。

当时计算机硬件局促的运算处理能力，已直接妨碍到了在单台计算机上信息系统软件能够达到的最大规模。为突破硬件算力的限制，各个高校、研究机构、软硬件厂商开始分头探索，寻找使用多台计算机共同协作来支撑同一套软件系统运行的可行方案。这一阶段是对分布式架构最原始的探索，从结果来看，历史局限决定了它不可能一蹴而就地解决分布式的难题，但仅从过程来看，这个阶段的探索称得上成绩斐然。研究过程的很多中间成果都对今天计算机科学的诸多领域产生了深远的影响，直接牵引了后续软件架构的演化进程。譬如，惠普公司（及后来被惠普收购的 Apollo）提出的[网络运算架构](https://en.wikipedia.org/wiki/Network_Computing_System)（Network Computing Architecture，NCA）是未来远程服务调用的雏形；卡内基·梅隆大学提出的[AFS 文件系统](https://en.wikipedia.org/wiki/Andrew_File_System)（Andrew File System）是日后分布式文件系统的最早实现（Andrew 意为纪念 Andrew Carnegie 和 Andrew Mellon）；麻省理工学院提出的[Kerberos 协议](<https://en.wikipedia.org/wiki/Kerberos_(protocol)>)是服务认证和访问控制的基础性协议，是分布式服务安全性的重要支撑，目前仍被用于实现包括 Windows 和 MacOS 在内众多操作系统的登录、认证功能，等等。

为了避免[UNIX 系统的版本战争](https://en.wikipedia.org/wiki/Unix_wars)在分布式领域中重演，负责制定 UNIX 系统技术标准的“[开放软件基金会](https://zh.wikipedia.org/wiki/%E9%96%8B%E6%94%BE%E8%BB%9F%E9%AB%94%E5%9F%BA%E9%87%91%E6%9C%83)”（Open Software Foundation，OSF，也即后来的“国际开放标准组织”）邀请了当时业界主流的计算机厂商一起参与，共同制订了名为“[分布式运算环境](https://en.wikipedia.org/wiki/Distributed_Computing_Environment)”（Distributed Computing Environment，DCE）的分布式技术体系。DCE 包含一套相对完整的分布式服务组件规范与参考实现，譬如源自 NCA 的远程服务调用规范（Remote Procedure Call，RPC），当时被称为[DCE/RPC](https://zh.wikipedia.org/wiki/DCE/RPC)，它与后来 Sun 公司向互联网工程任务组（Internet Engineering Task Force，IETF）提交的基于通用 TCP/IP 协议的远程服务标准[ONC RPC](https://zh.wikipedia.org/wiki/%E9%96%8B%E6%94%BE%E7%B6%B2%E8%B7%AF%E9%81%8B%E7%AE%97%E9%81%A0%E7%AB%AF%E7%A8%8B%E5%BA%8F%E5%91%BC%E5%8F%AB)被认为是现代 RPC 的共同鼻祖；源自 AFS 的分布式文件系统（Distributed File System，DFS）规范，当时被称为[DCE/DFS](https://en.wikipedia.org/wiki/DCE_Distributed_File_System)；源自 Kerberos 的服务认证规范；还有时间服务、命名与目录服务，就连现在程序中很常用的通用唯一识别符 UUID 也是在 DCE 中发明出来的。

由于 OSF 本身的 UNIX 背景，当时研究这些技术都带着浓厚的 UNIX 设计风格，有一个预设的重要原则是使分布式环境中的服务调用、资源访问、数据存储等操作尽可能透明化、简单化，使开发人员不必过于关注他们访问的方法或其他资源是位于本地还是远程。这样的主旨非常符合一贯的[UNIX 设计哲学](https://en.wikipedia.org/wiki/Unix_philosophy#cite_note-0)，然而这个过于理想化的目标背后其实蕴含着彼时根本不可能完美解决的技术困难。关于 UNIX 设计哲学，有几个不同的版本，这里指的是 Common Lisp 作者[Richard P. Gabriel](https://en.wikipedia.org/wiki/Richard_P._Gabriel)提出的[简单优先原则](https://en.wikipedia.org/wiki/KISS_principle)，即“Worse is Better”。

“调用远程方法”与“调用本地方法”尽管只是两字之差，但若要同时兼顾简单、透明、性能、正确、鲁棒、一致等特点的话，两者的复杂度就完全不可同日而语了。且不说远程方法不能再依靠本地方法那些以内联为代表的传统编译优化来提升速度，光是“远程”二字带来的网络环境下的新问题，譬如，远程的服务在哪里（服务发现），有多少个（负载均衡），网络出现分区、超时或者服务出错了怎么办（熔断、隔离、降级），方法的参数与返回结果如何表示（序列化协议），信息如何传输（传输协议），服务权限如何管理（认证、授权），如何保证通信安全（网络安全层），如何令调用不同机器的服务返回相同的结果（分布式数据一致性）等一系列问题，全部都需要设计者耗费大量心思。

面对重重困难与压力，DCE 不仅从零开始、从无到有地回答了其中大部分问题，构建出大量的分布式基础组件与协议，而且真的尽力做到了相对“透明”，譬如在 DFS 上访问文件，如果不考虑性能上的差异的话，就很难感受到它与本地磁盘文件系统有什么不同。可是，一旦要考虑性能上的差异，那远程和本地的鸿沟是无比深刻的，两者的速度往往有着数量级上的差距，完全不可调和。尤其是在那个时代的机器硬件条件下，为了让程序在运行效率上可被用户接受，开发者只能在方法本身运行时间很长，可以相对忽略远程调用成本时的情况下才能考虑分布式，如果方法本身运行时间不够长，就要人为用各种奇技淫巧刻意地构造出这样的场景，譬如将几个原本毫无关系的方法打包到一个方法体内，一块进行远程调用。一方面，这种构造长耗时方法本身就与期望用分布式来突破硬件算力限制、提升性能的初衷相互矛盾；另一方面，此时的开发人员实际上仍然必须每时每刻都意识到自己是在编写分布式程序，不可轻易踏过本地与远程的界限。设计向性能做出的妥协，令 DCE“尽量简单透明”的努力几乎全部付诸东流，本地与远程无论是编码、设计、部署还是运行效率角度上看，都有着天壤之别，开发一个能良好运作的分布式应用，需要极高的编程技巧和各方面的专业知识去支撑，这时候反而是人本身对软件规模的约束超过机器算力上的约束了。

DCE 的研究是计算机科学中第一次对分布式有组织领导、有标准可循、有巨大投入的尝试，但无论是 DCE 还是稍后出现的 CORBA，从结果来看，都不能称取得了成功，将一个系统拆分到不同的机器中运行，这样做带来的服务发现、跟踪、通信、容错、隔离、配置、传输、数据一致性和编码复杂度等方面的问题，所付出的代价远远超过了分布式所取得的收益。亲身经历过那个年代的计算机科学家、IBM 院士 Kyle Brown 事后曾评价道：“这次尝试最大的收获就是对 RPC、DFS 等概念的开创，以及得到了一个价值千金的教训：**某个功能能够进行分布式，并不意味着它就应该进行分布式，强行追求透明的分布式操作，只会自寻苦果。**”

:::quote 原始分布式时代的教训

Just because something **can** be distributed doesn’t mean it **should** be distributed. Trying to make a distributed call act like a local call always ends in tears

某个功能**能够**进行分布式，并不意味着它就**应该**进行分布式，强行追求透明的分布式操作，只会自寻苦果

:::right

—— [Kyle Brown](<https://en.wikipedia.org/wiki/Kyle_Brown_(computer_scientist)>)，IBM Fellow，[Beyond Buzzwords: A Brief History of Microservices Patterns](https://developer.ibm.com/technologies/microservices/articles/cl-evolution-microservices-patterns/)，2016

:::

以上结论是有违 UNIX 设计哲学的，却是当时现实情况下不得不做出的让步。摆在计算机科学面前有两条通往更大规模软件系统的道路，一条是尽快提升单机的处理能力，以避免分布式带来的种种问题；另一条路是找到更完美的解决如何构筑分布式系统的解决方案。

20 世纪 80 年代正是[摩尔定律](https://zh.wikipedia.org/wiki/%E6%91%A9%E5%B0%94%E5%AE%9A%E5%BE%8B)开始稳定发挥作用的黄金时期，微型计算机的性能以每两年即增长一倍的惊人速度提升，硬件算力束缚软件规模的链条很快变得松动，信息系统进入了以单台或少量几台计算机即可作为服务器来支撑大型信息系统运作的单体时代，且在很长的一段时间内，单体都将是软件架构的绝对主流。尽管如此，对于另外一条路径，即对分布式计算、远程服务调用的探索也从未有过中断。关于远程服务调用这个关键问题的历史、发展与现状，笔者还会在稍后的“[远程服务调用](/architect-perspective/general-architecture/api-style/rpc.html)”中，以现代 RPC 和 RESTful 为主角来进行更详细的讲述。那些在原始分布式时代中遭遇到的各种分布式问题，也还会在软件架构演进后面几个时代里被人们反复提起。

原始分布式时代提出的构建“符合 UNIX 的设计哲学的”“如同本地调用一般简单透明的”分布式系统这个目标，是软件开发者对分布式系统最初的美好愿景，迫于现实，它会在一定时期内被妥协、被舍弃，换句话说，分布式将会经过一段越来越复杂的发展进程。但是，到了三十多年以后的将来（即 2016 年服务网格重新提出透明通信的时候），随着分布式架构的逐渐成熟完善，取代单体成为大型软件的主流架构风格以后，这个美好的愿景终将还是会重新被开发者拾起。
