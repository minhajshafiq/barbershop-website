import { test } from "node:test";
import assert from "node:assert/strict";
import { getClickEvent, BOOKING_URL, GOOGLE_MAPS_URL } from "./site.ts";

test("reconnaît le lien d’itinéraire réellement utilisé par le site", () => {
  assert.equal(getClickEvent("https://www.google.com/maps/dir/?api=1&destination=101+Av.+Jean+Lolive,+93500+Pantin"), "click_directions");
});

test("préserve les clics appel, réservation et fiche Google", () => {
  assert.equal(getClickEvent("tel:+33123456789"), "click_call");
  assert.equal(getClickEvent(BOOKING_URL), "click_booking");
  assert.equal(getClickEvent(GOOGLE_MAPS_URL), "click_directions");
});

test("ignore les liens sans action suivie et les faux domaines Maps", () => {
  for (const href of ["", "/#contact", "https://www.instagram.com/the_experts_barbershop/", "https://maps.google.com.example.org/", "https://example.org/?url=maps.google.com", "https://www.google.com/search?q=barbier"]) {
    assert.equal(getClickEvent(href), null, href);
  }
});
