'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Code, Smartphone, Zap, Globe, ArrowRight, Menu, X } from 'lucide-react';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast websites optimized for speed, SEO, and user experience.'
    },
    {
      icon: Globe,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for your business.'
    }
  ];

  const projects = [
    { name: 'E-Commerce Platform', tech: 'Next.js, Stripe, PostgreSQL', color: 'from-purple-500 to-pink-500' },
    { name: 'SaaS Dashboard', tech: 'React, TypeScript, Tailwind', color: 'from-blue-500 to-cyan-500' },
    { name: 'Mobile Banking App', tech: 'React Native, Node.js', color: 'from-green-500 to-emerald-500' },
    { name: 'AI Content Platform', tech: 'Next.js, OpenAI, Python', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
            >
              DevAgency
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {['Services', 'Projects', 'About', 'Contact'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full transition-colors"
              >
                Get Started
              </motion.button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-black md:hidden pt-20"
        >
          <div className="flex flex-col items-center space-y-8 text-2xl">
            {['Services', 'Projects', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-indigo-400 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4f46e5" />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Build Digital Excellence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            We craft exceptional digital experiences that transform your vision into reality
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-indigo-600 hover:bg-indigo-600/10 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105">
              View Our Work
            </button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-b from-black to-indigo-950/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400 text-lg">Comprehensive solutions for your digital needs</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all"
              >
                <div className="bg-indigo-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Success stories from our portfolio</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p className="text-gray-200">{project.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-indigo-950/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '250+', label: 'Happy Clients' },
              { value: '50+', label: 'Team Members' },
              { value: '15+', label: 'Countries Served' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 text-indigo-100">Let&apos;s create something amazing together</p>
          <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105">
            Get in Touch
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent mb-4 md:mb-0">
              DevAgency
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Dribbble</a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2025 DevAgency. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
