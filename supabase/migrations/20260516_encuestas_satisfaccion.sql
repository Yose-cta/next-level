-- =============================================================================
-- ENCUESTAS DE SATISFACCION - Next Level Experience
-- =============================================================================
-- Tabla para recopilar feedback post-evento de los asistentes.
-- Una respuesta por compra (UNIQUE constraint en compra_id).
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.encuestas_satisfaccion (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  compra_id        uuid REFERENCES public.compras(id) ON DELETE SET NULL,
  comprador_email  text NOT NULL,
  comprador_nombre text,

  -- Ratings 1-5 estrellas
  rating_general    smallint CHECK (rating_general    BETWEEN 1 AND 5),
  rating_yoselvia   smallint CHECK (rating_yoselvia   BETWEEN 1 AND 5),
  rating_valentina  smallint CHECK (rating_valentina  BETWEEN 1 AND 5),
  rating_sebastian  smallint CHECK (rating_sebastian  BETWEEN 1 AND 5),
  rating_organizacion smallint CHECK (rating_organizacion BETWEEN 1 AND 5),

  -- Texto abierto
  lo_mejor    text,
  lo_mejorar  text,

  -- NPS clasico 0-10
  nps smallint CHECK (nps BETWEEN 0 AND 10),

  -- Testimonio + autorizacion para usarlo publicamente
  testimonio       text,
  permite_publicar boolean NOT NULL DEFAULT false,

  -- Metadata
  ip         text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),

  -- Una respuesta por compra
  CONSTRAINT encuestas_satisfaccion_compra_unique UNIQUE (compra_id)
);

CREATE INDEX IF NOT EXISTS idx_encuestas_compra
  ON public.encuestas_satisfaccion (compra_id);

CREATE INDEX IF NOT EXISTS idx_encuestas_created
  ON public.encuestas_satisfaccion (created_at DESC);

-- RLS: bloqueado por defecto, solo service_role (admin) puede leer.
-- El form publico inserta via API route que usa service_role.
ALTER TABLE public.encuestas_satisfaccion ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.encuestas_satisfaccion IS
  'Respuestas de encuestas post-evento. Una por compra.';
