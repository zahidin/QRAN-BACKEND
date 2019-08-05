--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: queues; Type: TABLE; Schema: public; Owner: rekeningku
--

CREATE TABLE public.queues (
    id integer NOT NULL,
    operator character varying(20) NOT NULL,
    number character varying(5) NOT NULL,
    "time" character varying(20) NOT NULL,
    hash character varying(60) DEFAULT 0 NOT NULL,
    status_login character varying(5) DEFAULT '0'::character varying NOT NULL
);


ALTER TABLE public.queues OWNER TO rekeningku;

--
-- Name: queues_id_seq; Type: SEQUENCE; Schema: public; Owner: rekeningku
--

CREATE SEQUENCE public.queues_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.queues_id_seq OWNER TO rekeningku;

--
-- Name: queues_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rekeningku
--

ALTER SEQUENCE public.queues_id_seq OWNED BY public.queues.id;


--
-- Name: queues id; Type: DEFAULT; Schema: public; Owner: rekeningku
--

ALTER TABLE ONLY public.queues ALTER COLUMN id SET DEFAULT nextval('public.queues_id_seq'::regclass);


--
-- Data for Name: queues; Type: TABLE DATA; Schema: public; Owner: rekeningku
--

COPY public.queues (id, operator, number, "time", hash, status_login) FROM stdin;
\.


--
-- Name: queues_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rekeningku
--

SELECT pg_catalog.setval('public.queues_id_seq', 535, true);


--
-- Name: queues queues_pkey; Type: CONSTRAINT; Schema: public; Owner: rekeningku
--

ALTER TABLE ONLY public.queues
    ADD CONSTRAINT queues_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

