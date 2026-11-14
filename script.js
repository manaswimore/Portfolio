const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));

// Reveal content as it enters the viewport.
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

// Highlight the active section in the navigation.
const sections=[...document.querySelectorAll('main section[id]')];
const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}}),{rootMargin:'-35% 0px -55% 0px'});
sections.forEach(section=>navObserver.observe(section));

// M.AI is a local portfolio FAQ demo. Connect an LLM endpoint to enable open-ended AI responses.
const panel=document.getElementById('aiPanel');
const launcher=document.getElementById('aiLauncher');
const close=document.getElementById('aiClose');
const messages=document.getElementById('aiMessages');
const input=document.getElementById('aiInput');
function toggleAI(open){panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));if(open)input.focus();}
launcher.addEventListener('click',()=>toggleAI(!panel.classList.contains('open')));
close.addEventListener('click',()=>toggleAI(false));
function addMessage(text,kind){const div=document.createElement('div');div.className='message '+kind;div.textContent=text;messages.appendChild(div);messages.scrollTop=messages.scrollHeight;}
function answerFor(question){const q=question.toLowerCase();
 if(q.includes('project')||q.includes('built'))return 'Manaswi’s featured projects are Rhythm (emotion-aware music recommendations), MeetScribe (AI meeting minutes) and OneCart (barcode-based smart shopping). Their descriptions and technologies are in the Projects section.';
 if(q.includes('skill')||q.includes('technology')||q.includes('stack'))return 'Her listed skills include C++, JavaScript, Python, HTML, CSS, React.js, Node.js, Express.js, MongoDB, MySQL, REST APIs, Git, GitHub and Google Cloud. Her core concepts include DSA, OOP, DBMS, Operating Systems and Computer Networks.';
 if(q.includes('experience')||q.includes('intern'))return 'Manaswi completed a Web Development Internship at CodSoft (Dec 2025–Jan 2026) and a Full Stack Web Development Internship at Perpetual Invention (Jun–Jul 2023). See the Experience section for details.';
 if(q.includes('education')||q.includes('college')||q.includes('cgpa'))return 'She is pursuing a B.Tech in Computer Engineering at Sinhgad Institute of Technology, Lonavala (Jul 2024–Jul 2027), with a 9.13 CGPA. She completed a Computer Engineering diploma at Government Polytechnic Pune with 82.29%.';
 if(q.includes('resume')||q.includes('cv'))return 'You can download Manaswi’s resume using the Resume button in the navigation or the Download Resume button in the hero section.';
 if(q.includes('contact')||q.includes('email')||q.includes('linkedin')||q.includes('github'))return 'You can contact Manaswi at manaswimore.sit.comp@gmail.com, connect on LinkedIn at linkedin.com/in/manaswimore2005, or explore github.com/manaswimore.';
 if(q.includes('who')||q.includes('about')||q.includes('manaswi'))return 'Manaswi More is a Computer Engineering student and aspiring Software Development Engineer based in Pune, India. She enjoys building AI-powered and full-stack web applications.';
 return 'I can answer questions about Manaswi’s projects, skills, experience, education, resume and contact details. Try asking about one of those topics!';
}
function submitQuestion(value){const question=value.trim();if(!question)return;addMessage(question,'user');input.value='';setTimeout(()=>addMessage(answerFor(question),'bot'),250);}
document.getElementById('aiForm').addEventListener('submit',e=>{e.preventDefault();submitQuestion(input.value);});
document.querySelectorAll('.quick-prompts button').forEach(button=>button.addEventListener('click',()=>submitQuestion(button.dataset.question)));
