import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

const projectsData = [
    {
        title: "Neural Net Visualizer",
        slug: "neural-net-visualizer",
        description: "An interactive 3D tool for visualizing neural network layers and weights in real-time. Built to help researchers debug architectures visually.",
        category: "AI / ML",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1XvQ_q7CnUSS-upD4AYeG8AhDgMcN56WdfrvWbYgmlewnaWjPFuj7Yapn64QNxP_nZ3pWmQIZ2zAD7-icK6urarK2quh-qgY1C5qJgxwlWExnKAwdk8FDggr2DQGuzf-ZmVbArlZAkF3YqdrcEPF8rHw1plw1kq-iB1gQdivvF7ekqZim8gAxSiX4PjZn1ochQh5jlz31h-4vW_u2VwqKYUcv2MR2rPo2u-mN6X4YQ04la3JSotQ8UifffjYMLU475XKZTd_9omx1",
        content: "Understanding the inner workings of complex neural networks remains a significant challenge for researchers. The 'Black Box' problem often hinders the optimization of model architectures.\n\nI built this system to bridge this gap. This web-based application parses standard model files and generates an interactive representation. Users can zoom into specific layers, inspect weights in real-time, and visualize the flow of tensors through the network. The goal was to create a tool that is not only functional but also performant enough to handle models with millions of parameters directly in the browser.",
        tech: ["React Three Fiber", "Python", "FastAPI"],
    },
    {
        title: "Microservices E-com Platform",
        slug: "microservices-ecom",
        description: "Scalable e-commerce backend built with 15+ microservices. Features event-driven architecture, distributed tracing, and real-time inventory.",
        category: "Fullstack",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-qnUMokfdzQuxBcIDPHxRKsaD2Ts1czG7wdYZqfvxATF3J9vTEPFgYEoxi1rp-8C9iErN4eqRBC7YIJdQHdW_0NCMX1xk6g92xB3ZHCg2Sssj-4GMadB9XWMObKnTPPnfvLje5PlBZjmUuIeyKckWxOCUWCVHqD8Q3MJZU0qmpZSOFBTtxRx_-0X_LDtTw7gBk-1zUrPRZYOJtZJWO7W_fynynxBpOTVQ6ouKyZGAEY1A81NVVyAtP14GDwQJNH_DL2MtPs62e5IC",
        content: "Built a fully robust, distributed e-commerce architecture from scratch to handle millions of concurrent users. Implemented distributed tracing for observability and highly available payment processing nodes.",
        tech: ["Go", "gRPC", "Kafka", "K8s"],
    },
    {
        title: "Enterprise AI Assistant",
        slug: "enterprise-ai-assistant",
        description: "An intelligent customer support bot capable of intent recognition and sentiment analysis. Fine-tuned on proprietary company data.",
        category: "AI / ML",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsAXwIzQ9EDGMP7stV-E2dLFbJTe5K6LoANRPNGk59ZYoyMPX96Mlx4_lrKxwtOCDQX1XNH_BF8HY3rrdMrsHya2PIeQL8dey0wG8XCmtjNgPWWyH1Eqeh4ubvcN7yIZtMM6k7QVi6AzSLzwoPxVMyIXvdD4xsZ5v3MA9H6ILOpGtNkQeUEH-MLYvOGEnOgc2lIzcq2oZQeCsqGzYdGWshlzPH9TNuLNuzKA90ig0IIQiZwsbL2vcQkN-lc06pM3oflx74m0vGUbTY",
        content: "Replaced a traditional rule-based system with a dynamic conversational AI agent. The bot is capable of resolving 75% of Tier 1 support tickets without human intervention, analyzing tone, and pulling context from the company's internal knowledge base via RAG (Retrieval-Augmented Generation).",
        tech: ["LLMs", "LangChain", "Pinecone"],
    },
    {
        title: "Real-time Analytics Pipeline",
        slug: "real-time-analytics",
        description: "End-to-end ELT pipeline processing 5TB+ daily. Uses change data capture (CDC) to sync operational DBs with a Snowflake warehouse.",
        category: "Data Eng",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1XvQ_q7CnUSS-upD4AYeG8AhDgMcN56WdfrvWbYgmlewnaWjPFuj7Yapn64QNxP_nZ3pWmQIZ2zAD7-icK6urarK2quh-qgY1C5qJgxwlWExnKAwdk8FDggr2DQGuzf-ZmVbArlZAkF3YqdrcEPF8rHw1plw1kq-iB1gQdivvF7ekqZim8gAxSiX4PjZn1ochQh5jlz31h-4vW_u2VwqKYUcv2MR2rPo2u-mN6X4YQ04la3JSotQ8UifffjYMLU475XKZTd_9omx1",
        content: "Engineered a low-latency data pipeline that transforms raw transactional data into actionable business intelligence within minutes. Leveraged dbt to version-control analytical models and ensure robust testing before deployment to the live warehouse.",
        tech: ["Apache Airflow", "Snowflake", "dbt"],
    },
    {
        title: "Smart City IOT Dashboard",
        slug: "smart-city-iot",
        description: "A centralized command center for monitoring IOT devices across a smart city infrastructure. Features map-based visualization and alert systems.",
        category: "Fullstack",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-qnUMokfdzQuxBcIDPHxRKsaD2Ts1czG7wdYZqfvxATF3J9vTEPFgYEoxi1rp-8C9iErN4eqRBC7YIJdQHdW_0NCMX1xk6g92xB3ZHCg2Sssj-4GMadB9XWMObKnTPPnfvLje5PlBZjmUuIeyKckWxOCUWCVHqD8Q3MJZU0qmpZSOFBTtxRx_-0X_LDtTw7gBk-1zUrPRZYOJtZJWO7W_fynynxBpOTVQ6ouKyZGAEY1A81NVVyAtP14GDwQJNH_DL2MtPs62e5IC",
        content: "An ambitious frontend project capable of maintaining thousands of active WebSocket connections to render live sensor data on a massive Mapbox interface. Optimized the rendering loop using WebGL to prevent browser memory leaks during extended operation hours.",
        tech: ["Vue.js", "Mapbox", "MQTT"],
    },
    {
        title: "Automated Defect Detection",
        slug: "automated-defect",
        description: "Computer vision system for manufacturing lines. Identifies defects with 99.8% accuracy at 120fps using edge-optimized models.",
        category: "AI / ML",
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATh4FbxKE0jidqyCanKvVINueWpVZKIFWrwwSoDgmY_A7BsZALkvnva9U0tjBC_wyFUCI5QzTcD44znEp6L8C6kAUyA8sDn-oBd5WD1rwEe9gS4oArWQyHhQxVqyYX2v9kNyzzUTgFCjH9kC4WKl5RX7WMX2rl_Si6sRpMCQsSxGSwFRcdAxcwc4EZgmMCV-3YNhpwcR8xON9hH7A3V64gW8dbP94RGRZmIbz6yQn9fBv049SWhpL6TgQtzwzw3fpLaYH-qOXJ9hOq",
        content: "Trained an object detection model optimized for TensorRT, running directly on NVIDIA Jetson embedded GPUs within a factory setting. Reduced false positive rates to less than 0.2%, revolutionizing the factory's QA process.",
        tech: ["PyTorch", "OpenCV", "NVIDIA Jetson"],
    }
];

const blogPostsData = [
    {
        title: "Architecting High-Throughput Real-Time AI Inference Pipelines",
        slug: "ai-inference-pipelines",
        excerpt: "An in-depth look at building a scalable, low-latency machine learning inference system using FastAPI, Redis, and Kubernetes.",
        content: "Deploying machine learning models to production is often more challenging than training them. While a Jupyter notebook is a great environment for experimentation, a production system needs to handle concurrent requests, manage resources efficiently, and scale dynamically based on traffic.\n\nWhen designing an inference pipeline, you typically face a trade-off between latency (how fast a single request is processed) and throughput (how many requests can be processed per second).\n\nTo achieve the best of both worlds, we implemented a microservice architecture using FastAPI for the API gateway, Redis as a message broker for dynamic batching, and an isolated model inference worker.\n\nBy decoupling the API gateway from the actual inference using Redis, we were able to scale our worker nodes independently. This architecture easily handles sudden spikes in traffic while keeping our GPU utilization optimal.",
        category: "System Design",
        tags: ["system"],
        coverImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOtxTuhk5v6MgyxBMSMsmoMowfSXj8E4O-N3nvcRyqUFXbLnVMeXqzjsTMctA3iciLFHrbo2EA7zyVk2ttBL-f29P8YEhqe1wV5qJLokakqp-BJvTlunm3tDojs4dflOmtg5OoJS0sCqNGvjHWoSySZWIG1b-fy9ji2JTm4mXpY4_hUm2M85NXrRl67LWoH_x1EvvL1cuF39OyXeWKjBGTkglQ-dfidUzGVL4QZfR95R7X8y4K-Z7YleIE-A4P1NLqagvYRTez4G-A",
        readTimeMinutes: 5,
        isFeatured: true,
    },
    {
        title: "Fine-Tuning Open Source LLMs for Domain-Specific Tasks",
        slug: "fine-tuning-llms",
        excerpt: "A practical guide to adapting models like LLaMA-2 for specialized domains using QLoRA, reducing compute requirements while maintaining high accuracy.",
        content: "Large Language Models have revolutionized natural language processing, but their general-purpose nature means they often fall short in specialized domains. Fine-tuning allows us to adapt these powerful models to specific use cases while maintaining their broad capabilities.\n\nQLoRA (Quantized Low-Rank Adaptation) is a breakthrough technique that makes fine-tuning accessible on consumer hardware by quantizing the base model to 4-bit precision while training lightweight adapter layers.",
        category: "Deep Learning",
        tags: ["llm"],
        readTimeMinutes: 8,
        isFeatured: false,
    },
    {
        title: "Building Robust ETL Pipelines with Apache Airflow and dbt",
        slug: "etl-airflow-dbt",
        excerpt: "How to structure your data warehousing projects for scalability and maintainability. Exploring modern data stack patterns and best practices.",
        content: "The modern data stack has evolved significantly. Apache Airflow serves as the orchestration layer, managing complex DAGs of data transformations, while dbt brings software engineering best practices to analytics code.\n\nBy combining these tools, teams can build data pipelines that are version-controlled, tested, and documented—treating data transformations as first-class software artifacts.",
        category: "Data Engineering",
        tags: ["python"],
        readTimeMinutes: 6,
        isFeatured: false,
    },
    {
        title: "State Management in React 18: Beyond Redux",
        slug: "react-state-management",
        excerpt: "Evaluating modern state management solutions like Zustand and Jotai for large-scale enterprise applications. Performance comparisons included.",
        content: "Redux has been the de facto state management solution for React applications for years, but the ecosystem has evolved. Modern alternatives like Zustand, Jotai, and Valtio offer simpler APIs with less boilerplate.\n\nIn this deep dive, we benchmark these solutions against Redux Toolkit in a production-grade e-commerce application, measuring bundle size, render performance, and developer experience.",
        category: "Fullstack",
        tags: ["react"],
        readTimeMinutes: 7,
        isFeatured: false,
    },
    {
        title: "Event-Driven Microservices: A Practical Architecture",
        slug: "event-driven-microservices",
        excerpt: "Designing resilient backend systems using Kafka, Node.js, and Docker. Strategies for handling distributed transactions and data consistency.",
        content: "Microservices architectures promise scalability and team autonomy, but they also introduce distributed systems challenges. Event-driven patterns help address these by decoupling services through asynchronous message passing.\n\nThis article walks through a production implementation using Apache Kafka as the event backbone, demonstrating patterns for eventual consistency, saga orchestration, and dead letter queue handling.",
        category: "System Design",
        tags: ["backend"],
        readTimeMinutes: 10,
        isFeatured: false,
    },
    {
        title: "Optimizing Vector Search for RAG Applications",
        slug: "vector-search-rag",
        excerpt: "A benchmark of Pinecone, Milvus, and pgvector for retrieval-augmented generation systems. Balancing accuracy with retrieval speed.",
        content: "Retrieval-Augmented Generation (RAG) systems depend heavily on the quality and speed of their vector search layer. Choosing the right vector database can make or break your AI application's user experience.\n\nWe benchmarked three popular solutions—Pinecone, Milvus, and pgvector—across dimensions of latency, recall accuracy, and cost efficiency at scale.",
        category: "Deep Learning",
        tags: ["llm"],
        readTimeMinutes: 5,
        isFeatured: false,
    },
    {
        title: "Streaming Analytics with Apache Flink and Kafka",
        slug: "streaming-analytics-flink",
        excerpt: "Processing millions of events per second in real-time. Creating powerful dashboards with exactly-once processing semantics.",
        content: "Real-time analytics requires processing data as it arrives, not in batches hours later. Apache Flink provides a powerful stream processing engine with exactly-once semantics, making it ideal for use cases where data accuracy is paramount.\n\nCombined with Kafka as the event source, Flink can process millions of events per second while maintaining stateful computations and windowed aggregations.",
        category: "Data Engineering",
        tags: ["python"],
        readTimeMinutes: 8,
        isFeatured: false,
    },
];

async function main() {
    console.log(`Start seeding...🧹 Cleaning database`);

    // Clean existing data
    await prisma.projectTechnology.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.technology.deleteMany({});
    await prisma.blogPost.deleteMany({});

    console.log(`🌱 Seeding projects...`);

    for (const data of projectsData) {
        const techRecords = await Promise.all(
            data.tech.map(async (techName) => {
                return prisma.technology.upsert({
                    where: { name: techName },
                    update: {},
                    create: { name: techName, iconType: "default" },
                });
            })
        );

        const project = await prisma.project.create({
            data: {
                title: data.title,
                slug: data.slug,
                description: data.description,
                content: data.content,
                category: data.category,
                coverImageUrl: data.coverImageUrl,
            },
        });

        for (const tech of techRecords) {
            await prisma.projectTechnology.create({
                data: {
                    projectId: project.id,
                    technologyId: tech.id,
                },
            });
        }
        
        // --- SEED PROJECT CHALLENGES & RESULTS (STAR Framework) ---
        await prisma.projectChallenge.create({
            data: {
                projectId: project.id,
                title: "Rendering Bottlenecks",
                challenge: "Rendering 100k+ nodes for massive datasets caused the DOM to freeze out of memory.",
                solution: "Implemented InstancedMesh in Three.js to render identical geometries with a single draw call, maintaining 60 FPS.",
                iconType: "TrendingUp"
            }
        });

        await prisma.projectChallenge.create({
            data: {
                projectId: project.id,
                title: "Data Serialization",
                challenge: "JSON parsing for 50MB+ model architecture files was drastically too slow on the client.",
                solution: "Developed a custom Protocol Buffers schema to stream binary data, reducing payload size by 40% and parse time by 70%.",
                iconType: "Database"
            }
        });

        await prisma.projectResult.createMany({
            data: [
                {
                    projectId: project.id,
                    metric: "50%",
                    value: "Reduction in model debugging time for the research team.",
                    color: "primary",
                    sortOrder: 1
                },
                {
                    projectId: project.id,
                    metric: "3 Labs",
                    value: "Currently adopted by major university research labs.",
                    color: "green",
                    sortOrder: 2
                },
                {
                    projectId: project.id,
                    metric: "60 FPS",
                    value: "Consistent performance on consumer-grade hardware.",
                    color: "blue",
                    sortOrder: 3
                }
            ]
        });
        
        console.log(`✅ Created project: ${project.title} (with STAR data)`);
    }

    console.log(`🌱 Seeding blog posts...`);

    for (const data of blogPostsData) {
        const post = await prisma.blogPost.create({
            data: {
                title: data.title,
                slug: data.slug,
                excerpt: data.excerpt,
                content: data.content,
                category: data.category,
                tags: data.tags,
                coverImageUrl: data.coverImageUrl || null,
                readTimeMinutes: data.readTimeMinutes,
                isFeatured: data.isFeatured,
            },
        });
        console.log(`✅ Created blog post: ${post.title}`);
    }

    // --- EDUCATION ---
    console.log(`🌱 Seeding education...`);
    await prisma.education.deleteMany({});

    const educationsData = [
        {
            degree: "Master of Science in Computer Science",
            institution: "Stanford University (Example)",
            description: "Specialization in Artificial Intelligence and Human-Computer Interaction.",
            startYear: 2020,
            endYear: 2022,
            sortOrder: 1,
        },
        {
            degree: "Bachelor of Science in Data Science",
            institution: "Massachusetts Institute of Technology (Example)",
            description: "Minor in Cognitive Science. Lead developer for the Undergraduate Research Opportunities Program (UROP).",
            startYear: 2016,
            endYear: 2020,
            sortOrder: 2,
        },
    ];

    for (const data of educationsData) {
        const edu = await prisma.education.create({ data });
        console.log(`✅ Created education: ${edu.degree}`);
    }

    // --- CERTIFICATIONS ---
    console.log(`🌱 Seeding certifications...`);
    await prisma.certification.deleteMany({});

    const certificationsData = [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            description: "Professional certification focusing on designing distributed systems on AWS. Validates expertise in designing scalable, highly available, and fault-tolerant systems.",
            issuedDate: "Issued 2023",
            sortOrder: 1,
        },
    ];

    for (const data of certificationsData) {
        const cert = await prisma.certification.create({ data });
        console.log(`✅ Created certification: ${cert.name}`);
    }

    // --- SITE SETTINGS ---
    console.log(`🌱 Seeding site settings...`);
    await prisma.siteSetting.deleteMany({});
    
    await prisma.siteSetting.create({
        data: {
            key: 'resumeUrl',
            value: '#', // Ganti dengan URL Supabase Storage nanti
            description: 'URL to the downloadable resume PDF',
        }
    });
    console.log(`✅ Created site setting: resumeUrl`);

    console.log(`Seeding finished. 🎉`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
