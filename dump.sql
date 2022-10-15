--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL,
    valid boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTc5MzMyMiwiZXhwIjoxNjY1ODExMzIyfQ.C6lEbss8YkvX_jsiHe3ryI6RasYvoWuVJS-KNhJkmoQ', true, '2022-10-14 21:22:02.857056');
INSERT INTO public.sessions VALUES (2, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY2NTc5MzcwMywiZXhwIjoxNjY1ODExNzAzfQ.eRBWd9FjEmq4kKL6StG735g7RCYecNaMDGtBWqrF_Ic', true, '2022-10-14 21:28:23.202159');
INSERT INTO public.sessions VALUES (3, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2NTc5Mzc1MCwiZXhwIjoxNjY1ODExNzUwfQ.9MY9ZjE7ZUXk0HnWvvie_unrsuejKBw8sDAuj8Yq8jE', true, '2022-10-14 21:29:10.480773');
INSERT INTO public.sessions VALUES (4, 12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJpYXQiOjE2NjU3OTM4MTksImV4cCI6MTY2NTgxMTgxOX0.GFFadkLmykq46Gde544bj6SSfGTT7rilSVjy5sWm9_U', true, '2022-10-14 21:30:19.23924');
INSERT INTO public.sessions VALUES (5, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY2NTc5Mzg1MSwiZXhwIjoxNjY1ODExODUxfQ.21wvmWi9AqA-eNNOQN1LyW4xmpTWHqL-m4oJaptN6ao', true, '2022-10-14 21:30:51.052404');
INSERT INTO public.sessions VALUES (6, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2NTc5Mzg4MiwiZXhwIjoxNjY1ODExODgyfQ.v5N8-MvprESTkCdxkkbcd5_t1C2BX8P5j-DkOgu4aeU', true, '2022-10-14 21:31:22.024727');
INSERT INTO public.sessions VALUES (7, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTY2NTc5Mzk2OCwiZXhwIjoxNjY1ODExOTY4fQ.B5peNdZndHxIrm4M-CwERy96Bv3G50tHZ2tmWvEXFYo', true, '2022-10-14 21:32:48.907779');
INSERT INTO public.sessions VALUES (8, 5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY2NTc5NDAwNSwiZXhwIjoxNjY1ODEyMDA1fQ.ALnYaMmvc1Fd7WiLv8_tTAE8e3CTzdam8_T5cHG5tHI', true, '2022-10-14 21:33:25.742252');
INSERT INTO public.sessions VALUES (9, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTY2NTc5NDA1NCwiZXhwIjoxNjY1ODEyMDU0fQ.6Ca7ENsoEAqdDar2cvXDnP5MsoxunjcFLkpvZfapung', true, '2022-10-14 21:34:14.788336');
INSERT INTO public.sessions VALUES (10, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTY2NTc5NDEwMSwiZXhwIjoxNjY1ODEyMTAxfQ.jbBYMTPIPoOOyhCC53tcpnD3_pnwZhpC3xIohz_sCQs', true, '2022-10-14 21:35:01.747335');
INSERT INTO public.sessions VALUES (11, 11, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJpYXQiOjE2NjU3OTQxMzgsImV4cCI6MTY2NTgxMjEzOH0.PubvXvSCvWcR8zKrc5gsNkroa0Gh5-OGfof01xWmfb4', true, '2022-10-14 21:35:38.580355');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 1, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'vV-rF_QT', 5, '2022-10-14 21:25:11.02989');
INSERT INTO public.urls VALUES (2, 1, 'https://bootcampra.notion.site/Materiais-038b870362b744d88c047f4e4e8beb46', 'mfAFUIHF', 1, '2022-10-14 21:26:53.776366');
INSERT INTO public.urls VALUES (3, 4, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'QoVA0rAb', 3, '2022-10-14 21:28:40.035256');
INSERT INTO public.urls VALUES (4, 2, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', '0tpLMtpU', 4, '2022-10-14 21:29:32.787747');
INSERT INTO public.urls VALUES (5, 12, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'uav8J5Aa', 0, '2022-10-14 21:30:31.856525');
INSERT INTO public.urls VALUES (6, 6, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'GwOsvzFe', 1, '2022-10-14 21:31:04.845757');
INSERT INTO public.urls VALUES (7, 7, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'AjZ7Sx8Q', 7, '2022-10-14 21:31:31.229969');
INSERT INTO public.urls VALUES (8, 3, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'GKOUC9Rg', 3, '2022-10-14 21:32:57.033687');
INSERT INTO public.urls VALUES (9, 5, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'Byw9fEx2', 0, '2022-10-14 21:33:40.506465');
INSERT INTO public.urls VALUES (10, 8, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', '_iKcUEk3', 2, '2022-10-14 21:34:28.421263');
INSERT INTO public.urls VALUES (11, 9, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'u352G0nz', 1, '2022-10-14 21:35:10.961967');
INSERT INTO public.urls VALUES (12, 11, 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg', 'UNxi_HNm', 0, '2022-10-14 21:35:46.426667');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'thais', 'thais@driven.com', '$2b$10$SaZ8MfIGVEItIPRb/I.8/upoLasGi6wLH2VEOU7bUWivkLaE3MTr6', '2022-10-14 21:19:06.499512');
INSERT INTO public.users VALUES (2, 'mari', 'mari@driven.com', '$2b$10$tWTYUnY7VDrQK62ysoQGJ.0EBe127sDWPkFRBih3fQFBb0eLAkAmW', '2022-10-14 21:19:15.995873');
INSERT INTO public.users VALUES (3, 'adri', 'adri@driven.com', '$2b$10$P7RKQ06IT0sTL1FRZt20Deae8z/dC1N2SCcJbWf1NGMyZ2QD8gZP.', '2022-10-14 21:19:25.633897');
INSERT INTO public.users VALUES (4, 'romin', 'romin@driven.com', '$2b$10$dC.3KKsTF61WBDRpe4Op1e4yK2Z8/tyvURgoIAMyT2A6jSXNkZq1C', '2022-10-14 21:19:33.670686');
INSERT INTO public.users VALUES (5, 'roberto', 'roberto@driven.com', '$2b$10$E4Q5/DHhoNrBVMh.LZn8DOg4VsYUZOPs5FSQdrZcbWSHvgoTWihHK', '2022-10-14 21:19:47.756458');
INSERT INTO public.users VALUES (6, 'simbolinha', 'simbolinha@driven.com', '$2b$10$kOYU7vPxPHiwxqHDXw/CZeuabLE6YdU/xE40Vz.f5bTEiDdQwlUVK', '2022-10-14 21:19:57.23365');
INSERT INTO public.users VALUES (7, 'lilize', 'lilize@driven.com', '$2b$10$pA.sZDDjOeanEiBHnpQeWeTFP0YuCs87BrbbZGdayD.1DWd8r5C72', '2022-10-14 21:20:14.842815');
INSERT INTO public.users VALUES (8, 'pingo', 'pingo@driven.com', '$2b$10$aUVUx5iasAhQFcqP.ukjWeJICczu1T3WK4N8dli109kjFnC5be0Xu', '2022-10-14 21:20:38.68567');
INSERT INTO public.users VALUES (9, 'bibi', 'bibi@driven.com', '$2b$10$Nx2JJj5qDFWRfVQl.UPG6OEOf4Obpp./C0pGNdyV9IIsETBJjEXhe', '2022-10-14 21:20:46.077007');
INSERT INTO public.users VALUES (10, 'fiufiu', 'fiufiu@driven.com', '$2b$10$Oa3JEoZycsBSKAuUPP17XejKFIjqmM.CpTl3TPFW/h6j5bmpD7sme', '2022-10-14 21:20:55.02593');
INSERT INTO public.users VALUES (11, 'rajada', 'rajada@driven.com', '$2b$10$F/1WZ/JW26vGQSU8L/KOqOd5O.tgZhulNHb0LsYdG7LKZ1LdpRRyK', '2022-10-14 21:21:12.429583');
INSERT INTO public.users VALUES (12, 'tron', 'tron@driven.com', '$2b$10$amhGo0w.LFhhx/yFzdCiq.wNq4Bw1koFcApdcDRr/NXgKMrii.Fp2', '2022-10-14 21:21:20.121694');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 11, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 12, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

